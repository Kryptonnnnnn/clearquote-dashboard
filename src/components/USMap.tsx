import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { C } from "./styles";

const hColor: Record<string,string> = {
  Healthy: C.green, Warning: C.amber, "At Risk": C.red,
};

export default function USMap({ customers }: { customers: any[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = svgRef.current.clientWidth || 700;
    const H = 280;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const proj = d3.geoAlbersUsa().scale(W * 1.1).translate([W/2, H/2]);
    const path = d3.geoPath().projection(proj);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then((us: any) => {
      svg.selectAll("path")
        .data((topojson.feature(us, us.objects.states) as any).features)
        .join("path").attr("d", path as any)
        .attr("fill","#f1f0ed").attr("stroke","#d1d5db").attr("stroke-width",0.6);

      customers.forEach(c => {
        const xy = proj([c.lng, c.lat]);
        if (!xy) return;
        const col = hColor[c.health] ?? "#888";
        const r = Math.max(4, Math.min(10, c.mrr/1500));
        const g = svg.append("g").style("cursor","pointer");
        g.append("circle")
          .attr("cx",xy[0]).attr("cy",xy[1]).attr("r",r)
          .attr("fill",col).attr("fill-opacity",0.8)
          .attr("stroke",col).attr("stroke-width",2).attr("stroke-opacity",0.25);
        g.on("mousemove",(ev: MouseEvent) => {
          const tip = tipRef.current; if(!tip) return;
          const rect = svgRef.current!.getBoundingClientRect();
          tip.style.left = ev.clientX - rect.left + 14 + "px";
          tip.style.top  = ev.clientY - rect.top  - 12 + "px";
          tip.style.display = "block";
          tip.innerHTML = `<strong style="font-size:13px">${c.name}</strong><br/><span style="color:#6b7280">$${(c.mrr/1000).toFixed(1)}k MRR · ${c.tier}</span><br/><span style="color:#6b7280">${c.city}, ${c.state}</span><br/><span style="color:${col};font-weight:600">${c.health}</span>`;
        }).on("mouseleave",() => { if(tipRef.current) tipRef.current.style.display="none"; });
      });

      // Legend
      const leg = svg.append("g").attr("transform",`translate(${W-100},${H-68})`);
      Object.entries(hColor).forEach(([label,col],i) => {
        leg.append("circle").attr("cx",6).attr("cy",i*22).attr("r",5).attr("fill",col).attr("fill-opacity",0.85);
        leg.append("text").attr("x",16).attr("y",i*22+4).attr("font-size",11).attr("fill","#6b7280").attr("font-family","DM Sans, sans-serif").text(label);
      });
    }).catch(()=>{});
  }, [customers]);

  return (
    <div style={{ position:"relative", width:"100%" }}>
      <svg ref={svgRef} style={{ width:"100%", height:280, display:"block" }}/>
      <div ref={tipRef} style={{
        position:"absolute", display:"none",
        background: C.surface, border:`1px solid ${C.border}`,
        borderRadius:8, padding:"8px 12px", fontSize:12,
        color: C.text, pointerEvents:"none",
        boxShadow:"0 4px 12px rgba(0,0,0,0.1)", zIndex:20, lineHeight:"1.6",
      }}/>
    </div>
  );
}
