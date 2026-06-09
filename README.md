![SAGEST](assets/banner.svg)

# SAGEST

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-4285F4?style=flat-square&logo=google&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

Herramienta de diagnóstico de aprendizaje organizacional y gestión del conocimiento para equipos de restaurante. Mide **cómo fluye el conocimiento** dentro de la operación: si se crea, retiene, comparte y aplica — no satisfacción ni desempeño.

---

## Qué mide

El diagnóstico cubre 5 dimensiones en dos módulos (~15 minutos):

| Dimensión | Foco |
|---|---|
| D1 — Aprendizaje organizacional | Capacidad del equipo para aprender de la operación |
| D2 — Gestión del conocimiento | Cómo se captura y distribuye el saber-hacer |
| D3 — Capital humano | Habilidades, formación y rotación del equipo |
| D4 — Cultura organizacional | Apertura al cambio, comunicación interna |
| D5 — Desempeño organizacional | Resultados operacionales medibles |

Al finalizar, el participante recibe un **radar de brechas** con recomendaciones priorizadas por dimensión y un código de acceso a su guía interactiva personalizada.

---

## Flujo

![Flujo del diagnóstico](assets/preview.svg)

Módulo 1 (Likert) → Módulo 2 (binarias) → scoring server-side → radar 5D + alertas → código de acceso → guía interactiva.

---

## Acceso

| Página | URL |
|---|---|
| Diagnóstico | [sagest.vercel.app](https://sagest.vercel.app) |
| Guía interactiva | [sagest.vercel.app/guia.html](https://sagest.vercel.app/guia.html) |
| Anexo técnico — arquitectura y flujo | [sagest.vercel.app/arquitectura](https://sagest.vercel.app/arquitectura) |

> El dashboard del facilitador requiere credenciales de acceso.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (vanilla) |
| Gráficas | Chart.js 4.4 |
| Backend / datos | Google Apps Script + Google Sheets |
| Hosting | Vercel |
| Tipografía | DM Sans, DM Serif Display, JetBrains Mono |

---

## Desarrollado por Fixoria

**[Fixoria](https://fixoria.com.co)** es una consultora colombiana especializada en IA aplicada y gestión del conocimiento organizacional. SAGEST nació como herramienta de diagnóstico inicial para equipos de restaurantes en Popayán, Colombia, dentro de un proceso de consultoría en aprendizaje organizacional.

[fixoria.com.co](https://fixoria.com.co)
