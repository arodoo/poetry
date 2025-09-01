/*
 * File: ThemeSeeder.java
 * Purpose: Seed default themes if repository empty. Idempotent.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;

@Transactional
public class ThemeSeeder {
  private final ThemeQueryPort query; private final ThemeCommandPort command;
  public ThemeSeeder(ThemeQueryPort q, ThemeCommandPort c){this.query=q;this.command=c;}
  public void seed(){ if(query.findAll().isEmpty()) defaults().forEach(command::save); }

  private List<Theme> defaults(){
    String[] encoded = new String[]{
      "Default|primary#4f46e5,secondary#64748b,accent#f59e0b,info#3b82f6,"+
        "warning#f59e0b,error#ef4444,success#10b981,surface#ffffff,"+
        "background#f8fafc,border#e2e8f0,muted#94a3b8,text#1e293b",
      "Dark|primary#6366f1,secondary#475569,accent#f59e0b,info#3b82f6,"+
        "warning#f59e0b,error#ef4444,success#10b981,surface#1e293b,"+
        "background#0f172a,border#334155,muted#64748b,text#f1f5f9",
      "Mint|primary#059669,secondary#10b981,accent#34d399,info#0ea5e9,"+
        "warning#f59e0b,error#dc2626,success#16a34a,surface#ffffff,"+
        "background#f0fdfa,border#d1fae5,muted#6ee7b7,text#064e3b",
      "Rose|primary#be185d,secondary#db2777,accent#ec4899,info#6366f1,"+
        "warning#f59e0b,error#dc2626,success#10b981,surface#fff1f2,"+
        "background#ffe4e6,border#fecdd3,muted#f9a8d4,text#831843",
      "Ocean|primary#0369a1,secondary#0ea5e9,accent#38bdf8,info#3b82f6,"+
        "warning#f59e0b,error#dc2626,success#10b981,surface#f0f9ff,"+
        "background#e0f2fe,border#bae6fd,muted#7dd3fc,text#0c4a6e",
      "Amber|primary#b45309,secondary#d97706,accent#f59e0b,info#2563eb,"+
        "warning#fbbf24,error#dc2626,success#10b981,surface#fffbeb,"+
        "background#fef3c7,border#fde68a,muted#fcd34d,text#78350f",
      "Slate|primary#475569,secondary#64748b,accent#94a3b8,info#3b82f6,"+
        "warning#f59e0b,error#dc2626,success#10b981,surface#f1f5f9,"+
        "background#e2e8f0,border#cbd5e1,muted#94a3b8,text#1e293b",
      "Forest|primary#065f46,secondary#047857,accent#059669,info#0ea5e9,"+
        "warning#f59e0b,error#b91c1c,success#16a34a,surface#f0fdf4,"+
        "background#dcfce7,border#bbf7d0,muted#86efac,text#064e3b",
      "Purple|primary#6d28d9,secondary#7c3aed,accent#8b5cf6,info#6366f1,"+
        "warning#f59e0b,error#dc2626,success#10b981,surface#f5f3ff,"+
        "background#ede9fe,border#ddd6fe,muted#c4b5fd,text#4c1d95",
      "Mono|primary#1f2937,secondary#374151,accent#4b5563,info#6b7280,"+
        "warning#f59e0b,error#ef4444,success#10b981,surface#ffffff,"+
        "background#f3f4f6,border#e5e7eb,muted#9ca3af,text#111827"
    };
    List<Theme> list = new ArrayList<>();
    for(String row: encoded){
      String[] parts = row.split("\\|");
      String name = parts[0];
      Map<String,String> colors = new LinkedHashMap<>();
      for(String kv: parts[1].split(",")){
        String[] kvp = kv.split("#");
        colors.put(kvp[0], "#"+kvp[1]);
      }
      list.add(Theme.createNew(name, colors));
    }
    return list;
  }
}
