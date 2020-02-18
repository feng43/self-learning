import fileSaver from 'file-saver';
import xlsx from 'xlsx';

function xlsxExport(data:any) {
  // 生成数据
  const exportDate = xlsx.utils.json_to_sheet(data.obj, {
    header: data.header.key,
  });

  for (const a in exportDate) {
    if (exportDate[a] instanceof Object) {
      exportDate[a].s = {
        alignment: { horizontal: 'center', vertical: 'center' },
      };
    }
  }

  // 判定merge
  const merge = data.merge || {};

  // 将表头中key换成value
  for (const a in exportDate) {
    if (exportDate[a] instanceof Object) {
      for (let index = 0; index < data.header.key.length; index++) {
        if (exportDate[a].v === data.header.key[index]) {
          exportDate[a].v = data.header.value[index];
        }
      }
    }
  }

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: Object.assign({}, exportDate, data.merge, merge),
    },
  };
  // 导出 Excel

  // const wbout = xlsx.write(wb, wopts);
  // const wb = xlsx.utils.json_to_sheet(data.obj,data.header.value);
  const wbout = xlsx.write(wb, {
    bookType: 'xlsx',
    type: 'binary',
  });

  function s2ab(s:any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    // eslint-disable-next-line no-bitwise
    for (let i = 0; i !== s.length; ++i) { view[i] = s.charCodeAt(i) & 0xff; }
    return buf;
  }
  const fileName = `${data.fileName}.xlsx` || `${new Date().getTime()}.xlsx`;

  fileSaver.saveAs(new Blob([s2ab(wbout)], { type: '' }), fileName);
}
export default xlsxExport;
