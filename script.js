function prosesInorder() {

    let input = document.getElementById("nodes").value;

    if (input.trim() === "") {
        alert("Masukkan node terlebih dahulu!");
        return;
    }

    let data = input.split(",").map(item => item.trim());

    document.getElementById("placeholderTree").style.display = "none";
    document.getElementById("treeSvg").style.height = "500px";

    gambarPohon(data);

    let hasil = [];
    let langkah = [];
    let nomor = 1;

    function inorder(index) {

        if (index >= data.length) {
            return;
        }

        inorder(2 * index + 1);

        langkah.push(
            nomor +
            ". Kunjungi node " +
            data[index]
        );

        hasil.push(data[index]);

        nomor++;

        inorder(2 * index + 2);
    }

    inorder(0);

    document.getElementById("hasil").innerHTML =
        hasil.join(" → ");

    document.getElementById("langkah").innerHTML =
        langkah.join("<br>");
}

function gambarPohon(data) {

    const svg =
        document.getElementById("treeSvg");

    svg.innerHTML = "";

    // otomatis menyesuaikan panjang teks
    const width = Math.max(
        1200,
        data.join("").length * 30
    );

    const levelHeight = 110;

    svg.setAttribute(
        "viewBox",
        `0 0 ${width} 550`
    );

    let posisi = [];

    for (let i = 0; i < data.length; i++) {

        let level =
            Math.floor(Math.log2(i + 1));

        let posisiDalamLevel =
            i - (Math.pow(2, level) - 1);

        let jumlahNodeLevel =
            Math.pow(2, level);

        let x =
            width /
            (jumlahNodeLevel + 1)
            *
            (posisiDalamLevel + 1);

        let y =
            80 +
            (level * levelHeight);

        posisi.push({
            x: x,
            y: y,
            value: data[i]
        });
    }

    // GARIS

    for (let i = 0; i < data.length; i++) {

        let parent = posisi[i];

        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < data.length) {

            let child = posisi[left];

            svg.innerHTML += `
            <line
                x1="${parent.x}"
                y1="${parent.y}"
                x2="${child.x}"
                y2="${child.y}"
                class="tree-line"
            />
            `;
        }

        if (right < data.length) {

            let child = posisi[right];

            svg.innerHTML += `
            <line
                x1="${parent.x}"
                y1="${parent.y}"
                x2="${child.x}"
                y2="${child.y}"
                class="tree-line"
            />
            `;
        }
    }

    // NODE

    posisi.forEach(node => {

        let radius = Math.max(
            35,
            node.value.length * 9
        );

        svg.innerHTML += `
        <circle
            cx="${node.x}"
            cy="${node.y}"
            r="${radius}"
            class="node-circle"
        />

        <text
            x="${node.x}"
            y="${node.y}"
            class="node-text">
            ${node.value}
        </text>
        `;
    });
}