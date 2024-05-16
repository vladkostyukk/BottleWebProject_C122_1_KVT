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
            // �������� ������� ���������� ���� � ��� ������� �� ����
            if (weight !== "" && parseFloat(weight) !== 0) {
                // ���������� ����� � ����� � ������ ������������ ��� ���
                graphData.edges.push({ from: i, to: j, label: weight, title: String(weight), smooth: { enabled: false }, arrows: { to: { enabled: false } } });
            }
        }
    }

    // ������� ���������� ��� �����
    var container = document.getElementById("network");
    container.innerHTML = "";

    // �������� ������� ��� ����������� �����
    var options = {
        layout: {
            hierarchical: {
                direction: "UD", // ������������ �����������
                sortMethod: "directed", // ���������� ������������ ����
                nodeSpacing: 150, // ���������� ����� ������
                levelSeparation: 200 // ���������� ����� ��������
            }
        },
        nodes: {
            shape: "circle",
            size: 30, // ����������� ������ �����
            font: {
                size: 18,
                face: "Arial",
                bold: {
                    size: 14,
                    vadjust: 0
                }
            },
            margin: 20,
            borderWidth: 2, // ����������� ������ ������� ����� ��� ������ ���������
            borderWidthSelected: 2 // ����������� ������ ������� ��������� �����
        },
        edges: {
            smooth: false, // ������ ����� ��� �������
            arrows: { to: { enabled: false } }, // ��������� ������� �����������
            font: {
                align: 'middle',
                size: 14, // ��������� ������ ������ ��� ����� ����, ����� ��������� ����������
                strokeWidth: 1, // ������������� ������ ������� ��� ��������� ��������� ������
                strokeColor: '#ffffff' // ���� ������� ������ (����� ��� ������� ���������)
            },
            scaling: {
                label: true
            },
            widthConstraint: {
                maximum: 50 // ������������� ������������ ������ ��� ����, ����� �������� ����������
            }
        },
        physics: {
            enabled: false // ��������� ���������� ��������� ��� ���������� �����������
        }
    };

    var network = new vis.Network(container, graphData, options);
}
