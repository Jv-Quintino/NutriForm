document.getElementById("data").innerText = new Date().toLocaleDateString();

const estrutura = {
    "Higiene Pessoal": [
    "1.Os colaboradores estão seguindo a norma da empresa de vestimenta para trabalhar na área de alimentos(fardamento completo, limpo e em bom estado de conservação)?",
    "2.Os colaboradores apresentam asseio pessoal e seguem as regras de higiene (usam protetor de cabelos; sem barbas/bigodes aparados; unhas curtas, limpas e sem esmaltes; sem maquiagem; sem adornos)?",
    "3.Não há nenhum colaborador doente (doença infectocontagiosa) na área de preparo de alimentos?",
    "4.Os colaboradores estão lavando as mãos corretamente e quando apropriado?",
    "5.As pias para lavar as mãos são devidamente providas de água, papel toalha não reciclado, sabonete bactericida, com sinalização, desobstruídas e bem higienizadas?",
    "6.As luvas são usadas e corretamente trocadas pelos colaboradores que manipulam alimentos prontos para consumo?",
    "7.Existem luvas disponíveis e de fácil acesso para a troca, quando for necessária?",
    "8. As áreas de manipulação estão livres de artigos pessoais e não há nenhuma evidência de consumo de comida, bebida, ou uso de cigarro?"
  ],

  "Higienização e Organização": [
    "1.Piso, paredes, teto, prateleiras, geladeiras, freezers, câmaras estão limpos e organizados?",
    "2.Todos os equipamentos estão limpos (incluindo lixeiras)?",
    "3.No depósito e nas câmaras, os alimentos estão acondicionados de forma a atender a legislação (afastados da parede e do chão, em paletes)?",
    "4.Os utensílios são mantidos limpos, organizados e acondicionados corretamente?",
    "5.Produtos químicos e as ferramentas de limpeza estão disponíveis? São todos aprovados?"
  ],
    "Higienização e Organização (Continuação)": [
        "Checklist de limpeza está preenchido corretamente?",
        "Todos os ralos estão limpos, com livre escoamento e sem água parada/estagnada?",
        "As áreas são mantidas livres de focos insalubres e de materiais em desuso e/ou estranhos ao ambiente?",
        "As lixeiras apresentam acionamento não manual; são suficientes; estão forradas com plásticos e permanecem fechadas?",
        "As áreas de alimentos estão livres de evidência ou atividade de pragas?"
    ],
    "Separação dos contaminantes": [
        "Os alimentos crus são mantidos separados dos alimentos prontos para consumo e também por espécies?",
        "Os produtos químicos são mantidos separados dos alimentos e das superfícies de contato com alimentos?",
        "Os alimentos e as superfícies de contato com alimentos estão protegidos contra contaminação física(ferrugem, vidro, peças de equipamentos soltas, cabelo, palah de aço, palitos, materiais de madeira, poeiras, esponjas desgastadas, paninhos...)?"
    ],
    "Manutenção de Temperatura": [
        "O estabelecimento tem termômetro calibrado para aferir temperatura?",
        "Os alimentos são cozidos na temperatura interna ideal (74°C)?",
        "Os alimentos quentes são mantidos à 60°C ou acima?",
        "Os itens refrigerados (5°C) e congelados (-18°C) estão nas temperaturas corretas?",
        "A linha de carga máxima dos equipamentos de cadeia de frio são respeitadas?",
        "Os procedimentos para o descongelamento de alimentos são executados corretamente(em refrigeração e início identificado)?"
    ],
    "Manutenção de Temperatura(Continuação)": [
        "Os procedimentos para o resfriamento de comidas são executados corretamente(em refrigeração)?",
        "Os registros de temperatura estão preenchidos corretamente?"
    ],
    "Sinalizações / Validades": [
        "Durante a vistoria, foi encontrado algum produto vencido?",
        "Todos os insumos estão sinalizados com validade original e com validade após abertura?",
        "Os produtos impróprios para consumo, estão em local específico, separado dos demais, protegidos e devidamente sinalizados.",
        "Na amostragem, a prática do PVPS é aplicada?",
        "Todos os alimentos expostos em embalagens fechadas, são rotulados conforme legislação, incluindo lista de ingredientes e alergênicos?"
    ],
    "Planilhas de controles": [
        "Todas as planilhas de controles estão sendo preenchidas e de fato realizadas corretamente?"
    ],
    "Comprometimento": [
        "Colaborador tem conhecimento acerca de boas práticas de manipulação realizadas em loja. Tem conhecimento das oportunidades ocorridas na última auditoria?"
    ]
};

let respostas = {};
let perguntasLista = [];

const form = document.getElementById("form");

let index = 0;

// GERAR FORMULÁRIO
for (let secao in estrutura) {
    let html = `<div class="secao"><h3>${secao}</h3>`;

    estrutura[secao].forEach(p => {
        perguntasLista.push(p);

        html += `
      <div class="pergunta">
        <div>${index + 1}. ${p}</div>

        <div class="botoes">
          <button data-id="${index}" data-val="C" onclick="responder(${index}, 'C')">C</button>
          <button data-id="${index}" data-val="NC" onclick="responder(${index}, 'NC')">NC</button>
          <button data-id="${index}" data-val="NA" onclick="responder(${index}, 'NA')">NA</button>
        </div>

        <textarea id="obs${index}" placeholder="Observação"></textarea>
      </div>
    `;
        index++;
    });

    html += `</div>`;
    form.innerHTML += html;
}

// BOTÕES
function responder(i, valor) {
    respostas[i] = valor;

    const botoes = document.querySelectorAll(`[data-id="${i}"]`);
    botoes.forEach(btn => btn.classList.remove("selected", "C", "NC", "NA"));

    const btn = document.querySelector(`[data-id="${i}"][data-val="${valor}"]`);
    if (btn) btn.classList.add("selected", valor);
}

// CÁLCULO
let percentualFinal = 0;
let statusFinal = "";

function calcular() {
  let total = 0;
  let nc = 0;
  let c = 0;

  for (let i = 0; i < perguntasLista.length; i++) {
    if (respostas[i] && respostas[i] !== "NA") {
      total++;

      if (respostas[i] === "NC") nc++;
      if (respostas[i] === "C") c++;
    }
  }

  percentualFinal = (nc / total) * 100 || 0;

  let status = "";
  let cor = "";

  if (percentualFinal > 20) {
    status = "VERMELHO";
    cor = "vermelho";
  } else if (percentualFinal >= 10) {
    status = "REGULAR";
    cor = "amarelo";
  } else {
    status = "BOM";
    cor = "verde";
  }

  statusFinal = status;

  document.getElementById("resultado").innerHTML = `
    <h3>RESULTADO</h3>

    <div class="resultado-item">
      <span>Questões avaliadas:</span>
      <strong>${total}</strong>
    </div>

    <div class="resultado-item">
      <span>Questões não conformes:</span>
      <strong>${nc}</strong>
    </div>

    <div class="resultado-item">
      <span>Questões conformes:</span>
      <strong>${c}</strong>
    </div>

    <div class="resultado-item">
      <span>Percentual:</span>
      <strong>${percentualFinal.toFixed(2)}%</strong>
    </div>

    <div class="resultado-item">
      <span>Status:</span>
      <strong>${status}</strong>
    </div>

    <div class="barra-container">
      <div class="barra ${cor}" style="width:${percentualFinal}%"></div>
    </div>
  `;
}

// PDF PROFISSIONAL FINAL
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(12);
    doc.text("CHECK LIST - BOAS PRÁTICAS DE FABRICAÇÃO", 10, y);

    y += 8;
    doc.setFontSize(10);
    doc.text("Setor: COZINHA", 10, y);
    doc.text("Data: " + new Date().toLocaleDateString(), 140, y);

    y += 10;

    let numero = 1;

    for (let secao in estrutura) {

        doc.setFontSize(11);
        doc.text(secao.toUpperCase(), 10, y);
        y += 6;

        estrutura[secao].forEach((p) => {

            const resp = respostas[numero - 1] || "";
            const obs = document.getElementById("obs" + (numero - 1))?.value || "";

            if (y > 270) {
                doc.addPage();
                y = 10;
            }

            // PERGUNTA
            doc.setFontSize(10);
            const linhas = doc.splitTextToSize(`${numero}. ${p}`, 180);
            doc.text(linhas, 10, y);
            y += linhas.length * 5;

            // ===== BOTÃO COLORIDO =====
            let cor = [156, 163, 175]; // NA
            let texto = "NA";

            if (resp === "C") {
                cor = [34, 197, 94];
                texto = "C";
            } else if (resp === "NC") {
                cor = [239, 68, 68];
                texto = "NC";
            }

            doc.setFillColor(...cor);
            doc.rect(10, y, 25, 8, "F");

            doc.setTextColor(255, 255, 255);
            doc.text(texto, 17, y + 5);

            doc.setTextColor(0, 0, 0);

            y += 12; // 🔥 espaço corrigido

            // ===== OBSERVAÇÃO =====
            if (obs.trim() !== "") {
                const linhasObs = doc.splitTextToSize("Obs: " + obs, 170);

                doc.setFontSize(9);
                doc.text(linhasObs, 12, y);

                y += (linhasObs.length * 5) + 3;
            }

            // LINHA SEPARADORA
            doc.line(10, y, 200, y);
            y += 5;

            numero++;
        });

        y += 5;
    }

    // ===== RESULTADO =====
    y += 10;

    doc.setFontSize(10);
    doc.text(`Não conformidade: ${percentualFinal.toFixed(2)}%`, 10, y);

    y += 8;
    doc.setFontSize(12);
    doc.text(`RESULTADO FINAL: ${statusFinal}`, 10, y);

    // ===== CRITÉRIOS =====
    y += 15;

    doc.setFontSize(11);
    doc.text("CRITÉRIOS DE AVALIAÇÃO", 10, y);

    y += 8;

    function barra(yPos, cor, texto) {
        doc.setFillColor(...cor);
        doc.rect(10, yPos, 40, 6, "F");
        doc.text(texto, 55, yPos + 5);
    }

    barra(y, [34, 197, 94], "BOM (0% a 9%)");
    y += 10;

    barra(y, [245, 158, 11], "REGULAR (10% a 20%)");
    y += 10;

    barra(y, [239, 68, 68], "RUIM (>20%)");

    doc.save("checklist-final.pdf");
}
