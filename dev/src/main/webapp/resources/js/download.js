// Funciones de descarga para niveles académicos
function downloadCSV() {
    var table = document.querySelector('#tableForm table');
    if (!table) {
        alert('No hay datos para descargar');
        return;
    }
    
    var rows = table.querySelectorAll('tbody tr');
    if (rows.length === 0) {
        alert('No hay datos para descargar');
        return;
    }
    
    var csv = 'ID,Nombre,Descripción\n';
    
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            var id = cells[0].textContent.trim();
            var nombre = cells[1].textContent.trim();
            var descripcion = cells[2].textContent.trim();
            
            csv += '"' + id + '","' + nombre.replace(/"/g, '""') + '","' + descripcion.replace(/"/g, '""') + '"\n';
        }
    }
    // Agregar BOM para Excel
    var BOM = "\uFEFF";
    var blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'niveles_academicos.csv';
    link.click();
}

// PDF REAL usando jsPDF
function downloadPDF() {
    if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
        alert('jsPDF no está cargado. Intenta recargar la página.');
        return;
    }
    var table = document.querySelector('#tableForm table');
    if (!table) {
        alert('No hay datos para descargar');
        return;
    }
    var rows = table.querySelectorAll('tbody tr');
    if (rows.length === 0) {
        alert('No hay datos para descargar');
        return;
    }
    // Extraer datos
    var data = [];
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].querySelectorAll('td');
        if (cells.length >= 3) {
            data.push([
                cells[0].textContent.trim(),
                cells[1].textContent.trim(),
                cells[2].textContent.trim()
            ]);
        }
    }
    // Crear PDF
    var doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(14);
    doc.text('Niveles Académicos - Sistema SENA', 14, 18);
    doc.setFontSize(10);
    doc.text('Reporte generado el: ' + new Date().toLocaleString('es-ES'), 14, 25);
    // Encabezados
    var headers = [["ID", "Nombre", "Descripción"]];
    // Usar autoTable si está disponible
    if (typeof doc.autoTable === 'function') {
        doc.autoTable({
            head: headers,
            body: data,
            startY: 30,
            styles: { font: 'helvetica', fontSize: 10 },
            headStyles: { fillColor: [13,110,253] },
            margin: { left: 14, right: 14 }
        });
    } else {
        // Fallback simple si no está autoTable
        var y = 35;
        doc.setFontSize(10);
        doc.text('ID   Nombre   Descripción', 14, y);
        y += 6;
        for (var j = 0; j < data.length; j++) {
            doc.text(data[j].join('   '), 14, y);
            y += 6;
        }
    }
    doc.save('niveles_academicos.pdf');
}