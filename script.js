function prosesInorder(){

    let input =
        document.getElementById("nodes").value;

    if(input.trim()===""){
        alert("Masukkan node terlebih dahulu!");
        return;
    }

    let data =
        input.split(",").map(item => item.trim());

    gambarPohon(data);

    let hasil = [];
    let langkah = [];
    let nomor = 1;

    function inorder(index){

        if(index >= data.length){
            return;
        }

        inorder(2 * index + 1);

        langkah.push(
            nomor + ". Kunjungi node " + data[index]
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

function gambarPohon(data){

    const tree =
        document.getElementById("treeContainer");

    tree.innerHTML = "";

    let level = 0;
    let index = 0;

    while(index < data.length){

        let jumlahNode =
            Math.pow(2, level);

        let row =
            document.createElement("div");

        row.className =
            "tree-level";

        for(
            let i=0;
            i<jumlahNode && index<data.length;
            i++
        ){

            let node =
                document.createElement("div");

            node.className =
                "tree-node";

            node.innerText =
                data[index];

            row.appendChild(node);

            index++;
        }

        tree.appendChild(row);

        level++;
    }
}