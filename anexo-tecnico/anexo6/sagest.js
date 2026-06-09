/* ============================================================
   SAGEST · Anexo 6 — interacción del blueprint
   ============================================================ */
(function(){
  "use strict";

  /* ---------- categorías y colores ---------- */
  var CAT = {
    screen:   {label:"Pantalla · Diagnóstico", c:"--c-screen"},
    output:   {label:"Pantalla · Resultado",   c:"--c-screen"},
    decision: {label:"Decisión del usuario",   c:"--c-decision"},
    green:    {label:"Cierre",                  c:"--c-decision"},
    process:  {label:"Proceso del sistema",     c:"--c-process"},
    matrix:   {label:"Matriz de recomendaciones", c:"--c-matrix"},
    role:     {label:"Modulación por rol",      c:"--c-role"},
    guide:    {label:"Guía personalizada",      c:"--c-guide"},
    facil:    {label:"Panel facilitador",       c:"--c-facil"},
    gap:      {label:"Detección de brechas",    c:"--c-gap"},
    note:     {label:"Nota técnica",            c:"--c-note"}
  };

  /* ---------- contenido de los paneles ---------- */
  var D = {
    p2:{cat:"screen",title:"Pantalla 2 · Contexto",html:
      "<p>Primera pantalla del diagnóstico en <span class='tok'>index.html</span>. El usuario selecciona el rol que ocupa dentro del restaurante.</p>"+
      "<p>Esa selección queda registrada en la variable <span class='tok'>c1</span> y condiciona toda la experiencia posterior, porque el sistema modula el tono y el contenido de las recomendaciones según quién responde.</p>"},
    p3:{cat:"screen",title:"Pantalla 3 · Likert (1 a 5)",html:
      "<p>Reúne trece ítems de las dimensiones D1 a D5 que el usuario califica en una escala Likert de uno a cinco.</p>"+
      "<p>Cada respuesta alimenta el cálculo de scores y determina la recomendación corta que se muestra al cerrar la primera fase.</p>"},
    p4:{cat:"screen",title:"Pantalla 4 · Binario",html:
      "<p>Pregunta de bifurcación del flujo. El usuario decide si continúa hacia la segunda fase del diagnóstico o si finaliza con los resultados de la primera.</p>"+
      "<p>Una respuesta afirmativa abre el Módulo 2 estratégico.</p>"},
    p5:{cat:"output",title:"Pantalla 5 · Momento 1 (Fase 1)",html:
      "<p>Pantalla de resultados de la primera fase. Muestra únicamente la recomendación corta, el campo <span class='tok'>rec_corta</span>, de las dimensiones D1 a D5.</p>"+
      "<p>El texto se toma directamente de la matriz, de modo que el usuario recibe orientación inmediata sin esperar al diagnóstico completo.</p>"},
    p6:{cat:"screen",title:"Pantalla 6 · Módulo 2 (estratégico)",html:
      "<p>Segunda fase del diagnóstico. Reúne doce ítems de las dimensiones D6, D7 y D8, de carácter estratégico.</p>"+
      "<p>Completa el perfil de madurez del restaurante en las ocho dimensiones del modelo.</p>"},
    p7:{cat:"output",title:"Pantalla 7 · Momento 2 (Fase 2)",html:
      "<p>Cierre del diagnóstico. Presenta la recomendación corta de las dimensiones D6 a D8 y genera el código <span class='tok'>SAG-XXXX</span> que el usuario necesita para abrir su guía personalizada.</p>"+
      "<p>En este punto las respuestas se agregan al panel del facilitador.</p>"},
    scores:{cat:"process",title:"Cálculo de scores integrado",html:
      "<p>Núcleo de procesamiento del sistema. Integra las respuestas de la primera fase (D1 a D5) y de la segunda (D6 a D8) y produce tres niveles de lectura.</p>"+
      "<h4>Salidas del cálculo</h4><ul>"+
      "<li>Un score por cada dimensión, de D1 a D8.</li>"+
      "<li>Un score por nivel de análisis individual, grupal, organizacional y estratégico.</li>"+
      "<li>Un score global en el rango de uno a cinco.</li></ul>"+
      "<p class='muted'>La escala se interpreta en tres tramos. Un valor entre 1.0 y 2.3 indica nivel bajo, entre 2.4 y 3.6 nivel medio y entre 3.7 y 5.0 nivel alto.</p>"},
    gaps:{cat:"gap",title:"Detección de brechas",html:
      "<p>Lógica que identifica el patrón <strong>aprende pero no institucionaliza</strong>, el hallazgo más frecuente del diagnóstico de campo.</p>"+
      "<p>El sistema lo detecta cuando el aprendizaje individual alcanza un nivel medio o superior mientras el nivel organizacional permanece bajo. La condición que dispara la alerta combina un score individual de 2.4 con un score organizacional de 2.3.</p>"+
      "<h4>Brechas que activa</h4><ul>"+
      "<li><span class='tok'>BRECHA-D1</span> &nbsp;Aprendizaje organizacional</li>"+
      "<li><span class='tok'>BRECHA-D2</span> &nbsp;Gestión del conocimiento</li>"+
      "<li><span class='tok'>BRECHA-D3</span> &nbsp;Capital humano</li></ul>"},
    roles:{cat:"role",title:"Modulación por rol",html:
      "<p>Ajusta el tono y el contenido de cada recomendación según el rol seleccionado en la variable <span class='tok'>c1</span>.</p>"+
      "<p>Una misma dimensión se comunica de forma estratégica para el propietario y de forma práctica para el cocinero, sin alterar el diagnóstico subyacente.</p>"+
      "<h4>Roles contemplados</h4><ul>"+
      "<li>Propietario, lectura estratégica</li><li>Chef, lectura técnica y operativa</li>"+
      "<li>Cocinero, lectura práctica</li><li>Mesero, lectura orientada al cliente</li>"+
      "<li>Administrativo</li></ul>"},
    facil:{cat:"facil",title:"Panel facilitador",html:
      "<p>Aplicación de acceso restringido (<span class='tok'>facilitador.html</span>) pensada para quien acompaña el diagnóstico. Concentra la información agregada de todos los diagnósticos aplicados y la presenta en cuatro vistas.</p>"+
      "<ul>"+
      "<li>Dashboard con métricas globales de todos los diagnósticos</li>"+
      "<li>Hallazgos de fortalezas y brechas del sector</li>"+
      "<li>Tabla de encuestados con el detalle de cada participante</li>"+
      "<li>Exportación de la información en formato CSV y PDF</li></ul>"},
    m1:{cat:"matrix",title:"Parte 1 · Niveles de madurez global",html:
      "<p>Primera parte de la matriz. Reúne cuatro perfiles de madurez que describen al restaurante como sistema antes de entrar al detalle por dimensión.</p>"+
      "<ul><li>Exploración</li><li>Desarrollo</li><li>Consolidación</li><li>Liderazgo</li></ul>"},
    m2:{cat:"matrix",title:"Parte 2 · Bloques dimensionales",html:
      "<p>Parte más extensa de la matriz, con noventa y seis bloques. Resulta de cruzar las ocho dimensiones con los cuatro niveles de análisis y los cuatro rangos de score.</p>"+
      "<h4>Las ocho dimensiones</h4><ul>"+
      "<li>D1 Aprendizaje organizacional</li><li>D2 Gestión del conocimiento</li>"+
      "<li>D3 Capital humano</li><li>D4 Cultura</li><li>D5 Desempeño</li>"+
      "<li>D6 Estrategia</li><li>D7 Innovación</li><li>D8 Contexto</li></ul>"},
    m3:{cat:"matrix",title:"Parte 3 · Bloques de brecha",html:
      "<p>Tres bloques específicos para el patrón aprende pero no institucionaliza. Se activan solo cuando la detección de brechas encuentra la condición correspondiente en D1, D2 o D3.</p>"+
      "<ul><li><span class='tok'>BRECHA-D1</span></li><li><span class='tok'>BRECHA-D2</span></li><li><span class='tok'>BRECHA-D3</span></li></ul>"},
    m4:{cat:"matrix",title:"Parte 4 · Modulación por rol",html:
      "<p>Cinco bloques que adaptan la comunicación de las recomendaciones a cada rol. No sustituyen el contenido dimensional, lo reescriben en el registro adecuado para cada perfil.</p>"+
      "<ul><li>Propietario</li><li>Chef</li><li>Cocinero</li><li>Mesero</li><li>Administrativo</li></ul>"},
    m5:{cat:"matrix",title:"Parte 5 · Contenido transversal",html:
      "<p>Contenido común a toda guía, independiente del score. Da contexto y soporte al usuario más allá de su perfil concreto.</p>"+
      "<ul><li>Introducción</li><li>Glosario de ocho términos</li><li>Veinte preguntas frecuentes</li></ul>"},
    mstruct:{cat:"matrix",title:"Estructura de cada bloque",html:
      "<p>Cada bloque de la matriz contiene seis campos. La distinción entre ellos define qué se muestra en el diagnóstico y qué se reserva para la guía.</p>"+
      "<ul>"+
      "<li><span class='tok'>rec_corta</span> &nbsp;dos o tres líneas que se muestran en los momentos m1 y m2</li>"+
      "<li><span class='tok'>rec_profunda</span> &nbsp;el desarrollo completo que aparece en la guía</li>"+
      "<li><span class='tok'>accion_30d</span> &nbsp;un paso ejecutable a treinta días</li>"+
      "<li><span class='tok'>accion_90d</span> &nbsp;un paso de mediano plazo a noventa días</li>"+
      "<li><span class='tok'>recurso</span> &nbsp;una herramienta o plantilla concreta</li>"+
      "<li><span class='tok'>biblio</span> &nbsp;la fuente académica que respalda el bloque</li></ul>"},
    algo:{cat:"matrix",title:"Algoritmo de priorización",html:
      "<p>Selecciona los cinco bloques que compondrán la guía y los ordena por prioridad. La regla antepone las brechas y desciende hacia las dimensiones con menor score.</p>"+
      "<ul>"+
      "<li><strong>1.</strong> Bloques de brecha cuando aplican, con prioridad máxima</li>"+
      "<li><strong>2.</strong> Dimensión con menor score en el nivel organizacional</li>"+
      "<li><strong>3.</strong> Dimensión con el score más bajo en cualquier nivel</li>"+
      "<li><strong>4.</strong> Nivel organizacional de la siguiente dimensión baja</li>"+
      "<li><strong>5.</strong> Recomendación estratégica de D6, D7 o D8</li></ul>"},
    gen:{cat:"guide",title:"Generación de la guía personalizada",html:
      "<p>Ensambla el contenido final que el usuario verá en <span class='tok'>guia.html</span> a partir de los cinco bloques priorizados.</p>"+
      "<ul>"+
      "<li>Perfil del restaurante y gráfico radar de D1 a D8</li>"+
      "<li>Cinco recomendaciones profundas, una por bloque seleccionado</li>"+
      "<li>Plan de acción con los pasos a treinta y noventa días</li>"+
      "<li>Recursos descargables, glosario, preguntas frecuentes y bibliografía</li></ul>"},
    g0:{cat:"guide",title:"Pantalla G0 · Entrada a la guía",html:
      "<p>Puerta de entrada a la guía personalizada. El usuario ingresa el código <span class='tok'>SAG-XXXX</span> que recibió al cerrar el diagnóstico.</p>"+
      "<p>El sistema valida el código antes de desplegar cualquier contenido.</p>"},
    dValid:{cat:"decision",title:"¿Código válido?",html:
      "<p>Punto de validación. Si el código existe y corresponde a un diagnóstico, el sistema despliega la guía.</p>"+
      "<p>Si no corresponde, devuelve al usuario a la pantalla de ingreso para reintentar.</p>"},
    invalid:{cat:"gap",title:"Código inválido",html:
      "<p>Estado de error. Aparece cuando el código ingresado no corresponde a ningún diagnóstico. El flujo regresa a la pantalla de entrada sin pérdida de contexto.</p>"},
    g1:{cat:"guide",title:"Pantalla G1 · Guía desplegada",html:
      "<p>Salida principal del sistema para el usuario final.</p>"+
      "<ul>"+
      "<li>Recomendación profunda por dimensión</li>"+
      "<li>Plan de acción a treinta y noventa días</li>"+
      "<li>Recursos y bibliografía de apoyo</li></ul>"},
    dWhats:{cat:"decision",title:"¿Consultar WhatsApp?",html:
      "<p>Decisión final del recorrido. El usuario puede cerrar el proceso con su guía o solicitar acompañamiento adicional a través del asesor.</p>"},
    whatsapp:{cat:"green",title:"WhatsApp Asesor SAGEST",html:
      "<p>Canal de acompañamiento humano. Conecta al usuario con un asesor de SAGEST para resolver dudas sobre la implementación de las recomendaciones.</p>"},
    finuser:{cat:"green",title:"Fin del recorrido del usuario",html:
      "<p>Cierre del recorrido. El diagnóstico y la guía quedan completados y las respuestas permanecen disponibles para el panel del facilitador.</p>"},
    artic:{cat:"note",title:"Articulación clave",html:
      "<p>La matriz de recomendaciones, con sus ciento once bloques, funciona como el único repositorio de contenido del sistema.</p>"+
      "<p>De ella se extraen tanto las respuestas cortas que se muestran en los momentos m1 y m2 como las respuestas profundas y el plan de acción de la guía. Ese origen común garantiza coherencia entre lo que el diagnóstico mide y lo que el sistema recomienda.</p>"},
    contenido:{cat:"note",title:"Contenido de cada bloque",html:
      "<p>Reparto de los campos de cada bloque según dónde se muestran.</p>"+
      "<ul>"+
      "<li><span class='tok'>rec_corta</span> alimenta los momentos m1 y m2</li>"+
      "<li><span class='tok'>rec_profunda</span> se despliega en la guía</li>"+
      "<li><span class='tok'>accion_30d</span> y <span class='tok'>accion_90d</span> forman el plan de acción</li>"+
      "<li><span class='tok'>recurso</span> y <span class='tok'>biblio</span> son el material de apoyo</li></ul>"},
    demo:{cat:"note",title:"Modo demo",html:
      "<p>El código <span class='tok'>SAG-DEMO</span> permite abrir la guía sin un diagnóstico real, útil para revisión y demostración.</p>"+
      "<p>En producción cada código <span class='tok'>SAG-XXXX</span> activa los scores reales del restaurante correspondiente.</p>"}
  };

  /* ---------- referencias del DOM ---------- */
  var canvas, viewport, world, detail, dchip, dtitle, dbody;
  var st = {scale:1, tx:0, ty:0, minS:0.18, maxS:2.4};

  function $(s,ctx){return (ctx||document).querySelector(s);}
  function $all(s,ctx){return Array.prototype.slice.call((ctx||document).querySelectorAll(s));}
  function cssVar(name){return getComputedStyle(document.documentElement).getPropertyValue(name).trim();}

  /* ---------- transform ---------- */
  function apply(){ world.style.transform = "translate("+st.tx+"px,"+st.ty+"px) scale("+st.scale+")"; }
  function clampS(s){ return Math.max(st.minS, Math.min(st.maxS, s)); }

  function bboxOf(ids){
    var minX=1e9,minY=1e9,maxX=-1e9,maxY=-1e9, found=false;
    ids.forEach(function(id){
      var el = canvas.querySelector('[data-node="'+id+'"]');
      if(!el) return;
      found=true;
      var x=el.offsetLeft, y=el.offsetTop, w=el.offsetWidth, h=el.offsetHeight;
      if(x<minX)minX=x; if(y<minY)minY=y;
      if(x+w>maxX)maxX=x+w; if(y+h>maxY)maxY=y+h;
    });
    if(!found) return {x:0,y:0,w:1840,h:1440};
    return {x:minX,y:minY,w:maxX-minX,h:maxY-minY};
  }

  function fitBox(box,pad){
    pad = pad==null?70:pad;
    var vw=viewport.clientWidth, vh=viewport.clientHeight;
    var s = clampS(Math.min((vw-pad*2)/box.w, (vh-pad*2)/box.h));
    st.scale = s;
    st.tx = (vw - box.w*s)/2 - box.x*s;
    st.ty = (vh - box.h*s)/2 - box.y*s;
    world.style.transition = "transform .42s cubic-bezier(.4,0,.2,1)";
    apply();
    setTimeout(function(){ world.style.transition=""; }, 460);
  }

  var SECTIONS = {
    all:    {label:"all"},
    fase:   ["p2","p3","p4","p5","p6","p7","scores","gaps","roles","artic"],
    matriz: ["m1","m2","m3","m4","m5","mstruct"],
    motor:  ["scores","gaps","roles","algo","gen"],
    guia:   ["algo","gen","g0","dValid","invalid","g1","dWhats","whatsapp","finuser"],
    facil:  ["facil"]
  };
  function fitSection(key){
    if(key==="all"){ fitBox({x:0,y:0,w:1840,h:1440}, 56); return; }
    fitBox(bboxOf(SECTIONS[key]), 80);
  }

  /* ---------- hover highlight ---------- */
  function lightUp(id){
    canvas.classList.add("focus");
    var lit = {}; lit[id]=true;
    $all(".edge").forEach(function(e){
      var f=e.getAttribute("data-from"), t=e.getAttribute("data-to");
      if(f===id || t===id){ e.classList.add("lit"); if(f)lit[f]=true; if(t)lit[t]=true; }
    });
    Object.keys(lit).forEach(function(nid){
      var el=canvas.querySelector('[data-node="'+nid+'"]');
      if(el){ el.classList.add("lit"); if(nid===id) el.classList.add("is-source"); }
    });
  }
  function clearLight(){
    canvas.classList.remove("focus");
    $all(".lit").forEach(function(el){ el.classList.remove("lit","is-source"); });
  }

  /* ---------- panel de detalle ---------- */
  function openDetail(id){
    var d=D[id]; if(!d) return;
    var cat=CAT[d.cat]||CAT.note;
    var color=cssVar(cat.c);
    detail.style.setProperty("--dc", color);
    dchip.innerHTML = '<span class="dot"></span>'+cat.label;
    dtitle.textContent = d.title;
    dbody.innerHTML = d.html;
    detail.classList.add("open");
  }
  function closeDetail(){ detail.classList.remove("open"); }

  /* ---------- pan & zoom ---------- */
  function setupPanZoom(){
    var dragging=false, moved=false, sx=0, sy=0, ox=0, oy=0;
    viewport.addEventListener("pointerdown",function(e){
      if(e.target.closest(".node,.diamond,.note")) return; // dejar pasar clicks de nodos
      dragging=true; moved=false; sx=e.clientX; sy=e.clientY; ox=st.tx; oy=st.ty;
      viewport.classList.add("panning"); viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener("pointermove",function(e){
      if(!dragging) return;
      var dx=e.clientX-sx, dy=e.clientY-sy;
      if(Math.abs(dx)+Math.abs(dy)>3) moved=true;
      st.tx=ox+dx; st.ty=oy+dy; apply();
    });
    function end(e){
      if(!dragging) return;
      dragging=false; viewport.classList.remove("panning");
      if(!moved && !e.target.closest(".node,.diamond,.note")) closeDetail();
    }
    viewport.addEventListener("pointerup",end);
    viewport.addEventListener("pointercancel",end);

    viewport.addEventListener("wheel",function(e){
      e.preventDefault();
      var rect=viewport.getBoundingClientRect();
      var mx=e.clientX-rect.left, my=e.clientY-rect.top;
      var factor = e.deltaY<0 ? 1.12 : 1/1.12;
      var ns=clampS(st.scale*factor);
      var k=ns/st.scale;
      st.tx = mx - (mx-st.tx)*k;
      st.ty = my - (my-st.ty)*k;
      st.scale=ns; apply();
    },{passive:false});
  }

  function zoomBy(factor){
    var vw=viewport.clientWidth/2, vh=viewport.clientHeight/2;
    var ns=clampS(st.scale*factor), k=ns/st.scale;
    st.tx = vw-(vw-st.tx)*k; st.ty = vh-(vh-st.ty)*k; st.scale=ns;
    world.style.transition="transform .2s ease"; apply();
    setTimeout(function(){world.style.transition="";},220);
  }

  /* ---------- nodos: eventos ---------- */
  function wireNodes(){
    $all("[data-node]").forEach(function(el){
      var id=el.getAttribute("data-node");
      el.addEventListener("mouseenter",function(){ lightUp(id); });
      el.addEventListener("mouseleave",clearLight);
      el.addEventListener("click",function(ev){ ev.stopPropagation(); openDetail(id); });
    });
  }

  /* ---------- pestañas ---------- */
  var blueprintReady=false;
  function showInstance(target){
    $all(".instance").forEach(function(i){ i.classList.toggle("active", i.id===target); });
    $all(".tab").forEach(function(t){ t.setAttribute("aria-selected", t.getAttribute("data-target")===target); });
    if(target==="blueprint" && !blueprintReady){
      blueprintReady=true;
      requestAnimationFrame(function(){ fitSection("all"); });
    }
  }

  /* ---------- init ---------- */
  function init(){
    canvas=$("#canvas"); viewport=$("#viewport"); world=$("#world");
    detail=$("#detail"); dchip=$("#dchip"); dtitle=$("#dtitle"); dbody=$("#dbody");

    wireNodes();
    setupPanZoom();

    $all(".tab").forEach(function(t){
      t.addEventListener("click",function(){ showInstance(t.getAttribute("data-target")); });
    });
    var openBp=$("#open-blueprint");
    if(openBp) openBp.addEventListener("click",function(){ showInstance("blueprint"); window.scrollTo(0,0); });

    $all("[data-fit]").forEach(function(b){
      b.addEventListener("click",function(){
        $all("[data-fit]").forEach(function(x){x.classList.remove("active");});
        b.classList.add("active");
        fitSection(b.getAttribute("data-fit"));
      });
    });
    var zin=$("#zin"), zout=$("#zout");
    if(zin) zin.addEventListener("click",function(){ zoomBy(1.25); });
    if(zout) zout.addEventListener("click",function(){ zoomBy(1/1.25); });

    var dclose=$("#dclose");
    if(dclose) dclose.addEventListener("click",closeDetail);
    document.addEventListener("keydown",function(e){ if(e.key==="Escape") closeDetail(); });

    var lt=$("#legend-toggle");
    if(lt) lt.addEventListener("click",function(){ $("#legend").classList.toggle("collapsed"); });

    // anclas del índice (scroll suave)
    $all('.toc a').forEach(function(a){
      a.addEventListener("click",function(e){
        var id=a.getAttribute("href").slice(1);
        var el=document.getElementById(id);
        if(el){ e.preventDefault(); window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-64, behavior:"smooth"}); }
      });
    });
  }

  if(document.readyState!=="loading") init();
  else document.addEventListener("DOMContentLoaded",init);
})();
