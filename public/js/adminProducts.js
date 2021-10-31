
window.addEventListener("load", () => {
    function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        let aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        let bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        if (!isNaN(parseFloat(aColText)) && !isNaN(parseFloat(bColText))) {
            aColText = parseFloat(aColText)
            bColText = parseFloat(bColText)
        }

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    })

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}
document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    if (headerCell.innerHTML != "Editar/Borrar" && headerCell.innerHTML != "Imagen") {
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    
            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    }

});

const rows = document.querySelectorAll("tr[data-href]")

rows.forEach(row => {
    row.addEventListener("click", () => {
        window.location.href = row.dataset.href
    })
})})



