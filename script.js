function prosesInorder() {

    let input = document.getElementById("nodes").value;
    let data = input.split(",");

    let hasil = [];

    function inorder(index) {

        if (index >= data.length) {
            return;
        }

        inorder(2 * index + 1);

        hasil.push(data[index]);

        inorder(2 * index + 2);
    }

    inorder(0);

    document.getElementById("hasil").innerHTML =
        hasil.join(" ");
}