function buildGraph() {
    // ��������� ���������� ������ ����� �� ���� �����
    var vertexCount = parseInt(document.getElementById("vertices-input").value);

    // �������� ������� ��� �������� ������ � �����
    var graphData = {
        nodes: [],
        edges: []
    };

    // ��������� ������ �����
    for (var i = 0; i < vertexCount; i++) {
        graphData.nodes.push({ id: i, label: String(i), shape: "circle" });
    }

    // ��������� ���� �����
    for (var i = 0; i < vertexCount; i++) {
        for (var j = i + 1; j < vertexCount; j++) {
            // ��������� ���� ����� �� ������� �����
            var weight = document.getElementById(`cell-${i}-${j}`).value;
            // �������� ������� ���������� ����
            if (weight !== "") {
                // ���������� ����� � ����� � ������ ������������ ��� ���
                graphData.edges.push({ from: i, to: j, label: weight, title: String(weight) });
            }
        }
    }

    // ������� ���������� ��� �����
    var container = document.getElementById("network");
    container.innerHTML = "";

    // �������� ������� ��� ����������� �����
    var options = {
        nodes: {
            shape: "circle",
            size: 20,
            font: {
                size: 18,
                face: "Arial",
                bold: {
                    size: 14,
                    vadjust: 0
                }
            },
            margin: 20
        },
        edges: {
            smooth: {
                type: "straightCross",
                forceDirection: "vertical"
            },
            arrows: {
                to: { enabled: false }
            },
            font: {
                align: 'middle'
            },
            scaling: {
                label: true
            }
        }
    };
    var network = new vis.Network(container, graphData, options);
}
