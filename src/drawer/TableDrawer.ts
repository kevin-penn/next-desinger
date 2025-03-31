import { Canvas as FabricCanvas, Rect, FabricText, Line, Group } from 'fabric'

class TableDrawer {
    private canvas: FabricCanvas;

    constructor(canvas: FabricCanvas) {
        this.canvas = canvas;
    }

    drawTable(table: { tableName: string; fields: Array<{ name: string; type: string; comment?: string; isPK?: boolean }> }) {
        const { tableName, fields } = table;
        const padding = 10;
        const rowHeight = 30;
        const columnWidth = 150;
        const tableWidth = columnWidth * 3;
        // 修改表格高度计算，加上表头的高度
        const tableHeight = rowHeight * (fields.length + 2); // +2: 一个是表头行，一个是表名行

        // 创建一个数组来存储所有表格元素
        const tableElements: any[] = [];

        // Draw table border
        const tableBorder = new Rect({
            left: padding,
            top: padding,
            width: tableWidth,
            height: tableHeight,
            fill: '#ffffff',
            stroke: '#000000',
            strokeWidth: 1,
        });
        tableElements.push(tableBorder);

        const tableNameText = new FabricText(tableName, {
            left: padding + 10,
            top: padding + 5,
            fontSize: 16,
            fontWeight: 'bold',
            width: tableWidth,
            fontFamily: 'Arial',
        });
        tableElements.push(tableNameText);

        const headerSeparator = new Line([
            padding, 
            padding + rowHeight, 
            padding + tableWidth, 
            padding + rowHeight
        ], {
            stroke: '#000000',
            strokeWidth: 1
        });
        tableElements.push(headerSeparator);

        // 添加列分隔线
        for (let i = 1; i < 3; i++) {
            const columnSeparator = new Line([
                padding + columnWidth * i,
                padding + rowHeight,
                padding + columnWidth * i,
                padding + tableHeight
            ], {
                stroke: '#000000',
                strokeWidth: 1
            });
            tableElements.push(columnSeparator);
        }

        // 添加行分隔线
        for (let i = 2; i <= fields.length + 1; i++) {
            const rowSeparator = new Line([
                padding,
                padding + rowHeight * i,
                padding + tableWidth,
                padding + rowHeight * i
            ], {
                stroke: '#000000',
                strokeWidth: 1
            });
            tableElements.push(rowSeparator);
        }

        // Draw header row
        const headers = ['Name', 'Type', 'Comment'];
        headers.forEach((header, index) => {
            const headerText = new FabricText(header, {
                left: padding + index * columnWidth + 10,
                top: padding + rowHeight + 5,
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Arial',
            });
            tableElements.push(headerText);
        });

        // Draw fields
        fields.forEach((field, rowIndex) => {
            const rowY = padding + rowHeight * (rowIndex + 2) + 5;

            const fieldNameText = new FabricText(field.name, {
                left: padding + 10,
                top: rowY,
                fontSize: 12,
                fontFamily: 'Arial',
            });
            tableElements.push(fieldNameText);

            const fieldTypeText = new FabricText(field.type, {
                left: padding + columnWidth + 10,
                top: rowY,
                fontSize: 12,
                fontFamily: 'Arial',
            });
            tableElements.push(fieldTypeText);

            const fieldCommentText = new FabricText(field.comment || '', {
                left: padding + columnWidth * 2 + 10,
                top: rowY,
                fontSize: 12,
                fontFamily: 'Arial',
            });
            tableElements.push(fieldCommentText);

            if (field.isPK) {
                const pkIndicator = new FabricText('PK', {
                    left: padding + columnWidth * 2 + 10,
                    top: rowY,
                    fontSize: 12,
                    fill: 'black',
                    fontFamily: 'Arial',
                });
                tableElements.push(pkIndicator);
            }
        });
        
        // 创建表格组并添加到画布
        const tableGroup = new Group(tableElements, {
            selectable: true,
            hasControls: false,     // 禁用控制点
            lockScalingX: true,     // 锁定水平缩放
            lockScalingY: true,     // 锁定垂直缩放
            lockRotation: true,     // 锁定旋转
            lockSkewingX: true,     // 锁定水平倾斜
            lockSkewingY: true,     // 锁定垂直倾斜
        });
        this.canvas.add(tableGroup);
        this.canvas.renderAll();
    }
}

export default TableDrawer;