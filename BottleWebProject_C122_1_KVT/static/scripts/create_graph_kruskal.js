function buildGraphKruskal() {
    var vertexCount = parseInt(document.getElementById("vertices-input").value);
    var graphData = { nodes: [], edges: [] };
    const errorMessageElement = document.getElementById('error-message');

    for (var i = 0; i < vertexCount; i++) {
        graphData.nodes.push({ id: i, label: String(i), shape: "circle", size: 40 }); // ����������� ������ ����� �� 40
    }

    for (var i = 0; i < vertexCount; i++) {
        for (var j = i + 1; j < vertexCount; j++) {
            var weight = document.getElementById(`cell-${i}-${j}`).value;
            if (weight !== "" && parseFloat(weight) !== 0) {
                graphData.edges.push({
                    from: i,
                    to: j,
                    label: weight,
                    title: String(weight),
                    smooth: { enabled: false },
                    arrows: { to: { enabled: false } },
                    width: 2 // ����������� ������� �����
                });
            }
        }
    }

    var container = document.getElementById("network");
    container.innerHTML = "";

    var options = {
        layout: {
            improvedLayout: true,
            randomSeed: 2, // ��������� ��������� ��������� �����
            clusterThreshold: 150,
            hierarchical: { enabled: false }
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -30000,
                centralGravity: 0.1,
                springLength: 200,
                springConstant: 0.05,
                damping: 0.09,
                avoidOverlap: 1
            },
            solver: 'barnesHut',
            stabilization: {
                enabled: true,
                iterations: 1000,
                fit: true // ������������� ��������� ���� � ����������
            },
            minVelocity: 0.75,
            maxVelocity: 50
        },
        interaction: { navigationButtons: true, keyboard: true },
        nodes: {
            shape: "circle",
            size: 40, // ����������� ������ ����� �� 40
            font: { size: 20, face: "Arial", bold: { size: 14, vadjust: 0 } },
            margin: 20,
            borderWidth: 2,
            borderWidthSelected: 2
        },
        edges: {
            smooth: false,
            arrows: { to: { enabled: true } }, 
            font: {
                align: 'middle',
                size: 16,
                strokeWidth: 1,
                strokeColor: '#ffffff'
            },
            scaling: { label: true },
            widthConstraint: { maximum: 50 }
        }
    };

    var network = new vis.Network(container, graphData, options);
    network.fit(); // ������������� ������������ ����

    document.getElementById('graphButtons').style.display = 'block';
    errorMessageElement.style.display = 'none';
}
