"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface ImpactChartProps {
  data: DataPoint[];
  title: string;
  unit: string;
}

export const ImpactChart: React.FC<ImpactChartProps> = ({ data, title, unit }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 250;
    const margin = { top: 40, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Define Gradient
    const defs = svg.append("defs");
    data.forEach((d, i) => {
      const gradient = defs
        .append("linearGradient")
        .attr("id", `bar-gradient-${i}`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d.color)
        .attr("stop-opacity", 1);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d.color)
        .attr("stop-opacity", 0.3);
    });

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground/80 font-semibold text-xs tracking-wider uppercase")
      .text(title);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.value) || 100) * 1.1])
      .range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}${unit}`).tickSize(-innerWidth).tickPadding(10);

    const yAxisG = g.append("g")
      .call(yAxis)
      .attr("class", "text-muted-foreground/40 text-[9px]")
      .select(".domain")
      .remove();

    g.selectAll(".tick line")
      .attr("stroke", "currentColor")
      .attr("stroke-dasharray", "2,2")
      .attr("opacity", 0.2);

    const xAxisG = g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("class", "text-muted-foreground/60 text-[10px] font-medium")
      .select(".domain")
      .attr("stroke", "var(--border)")
      .attr("opacity", 0.5);

    // Bars
    const bars = g
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label) || 0)
      .attr("y", innerHeight)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("rx", 6)
      .attr("fill", (_d, i) => `url(#bar-gradient-${i})`)
      .attr("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1)
          .attr("filter", "brightness(1.2) drop-shadow(0 0 12px var(--primary))");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.8)
          .attr("filter", "none");
      });

    bars
      .transition()
      .duration(1200)
      .ease(d3.easeElasticOut.amplitude(1).period(0.6))
      .delay((_d, i) => i * 150)
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => innerHeight - yScale(d.value));

    // Glow effect
    g.selectAll(".glow")
      .data(data)
      .join("rect")
      .attr("x", (d) => (xScale(d.label) || 0) - 2)
      .attr("y", (d) => yScale(d.value) - 2)
      .attr("width", xScale.bandwidth() + 4)
      .attr("height", (d) => innerHeight - yScale(d.value) + 4)
      .attr("fill", (d) => d.color)
      .attr("opacity", 0)
      .attr("rx", 8)
      .style("filter", "blur(12px)")
      .transition()
      .duration(1500)
      .delay((_d, i) => i * 150 + 400)
      .attr("opacity", 0.15);

    // Value Labels
    g.selectAll(".label")
      .data(data)
      .join("text")
      .attr("x", (d) => (xScale(d.label) || 0) + xScale.bandwidth() / 2)
      .attr("y", innerHeight)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-[11px] font-bold")
      .attr("opacity", 0)
      .text((d) => `${d.value}${unit}`)
      .transition()
      .duration(800)
      .delay((_d, i) => i * 150 + 600)
      .attr("y", (d) => yScale(d.value) - 12)
      .attr("opacity", 1);

  }, [data, title, unit]);

  return (
    <div className="w-full h-full min-h-[250px] bg-card/30 backdrop-blur-sm rounded-xl border border-border p-4 overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      />
    </div>
  );
};
