import { createRoot } from 'react-dom/client';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { BsArrowUpLeftSquare, BsTable, BsBoundingBoxCircles, BsSlashLg } from 'react-icons/bs';
import { Canvas as FabricCanvas } from 'fabric';
import TableDrawer from './drawer/TableDrawer';
import './global.css';
import { useEffect, useRef } from 'react';

const App = () => {
    const canvasRef = useRef<FabricCanvas | null>(null);

    useEffect(() => {
        const canvasElement = document.getElementById('mainCanvas') as HTMLCanvasElement;

        if (canvasElement) {

            console.log("创建Fabric canvas");
            // 设置canvas的实际尺寸
            canvasElement.width = canvasElement.offsetWidth;
            canvasElement.height = canvasElement.offsetHeight;

            // 创建fabric canvas实例
            const fabricCanvas = new FabricCanvas(canvasElement);
            canvasRef.current = fabricCanvas;

            fabricCanvas.renderAll();

            // 添加鼠标事件监听
            fabricCanvas.on('mouse:down', (options) => {
                const endObject = options.target;
                console.log(options);
                console.log(options.target);
            });

        }

    }, []);

    const handleToolChange = (toolValue: number) => {
        const fabricCanvas = canvasRef.current;

        switch (toolValue) {
            case 1: // 选择工具
                break;
            case 2: // 表格工具
                // 创建表格绘制器
                const tableDrawer = new TableDrawer(fabricCanvas);

                // 绘制示例表格
                tableDrawer.drawTable({
                    tableName: "User",
                    fields: [
                        { name: 'id', type: 'INT', isPK: true },
                        { name: 'username', type: 'VARCHAR(50)', comment: '用户名' },
                        { name: 'email', type: 'VARCHAR(100)', comment: '邮箱地址' },
                        { name: 'created_at', type: 'TIMESTAMP', comment: '创建时间' },
                        { name: 'status', type: 'TINYINT', comment: '用户状态' },
                    ],
                });
                break;
            case 3: // 矩形工具
                // 这里可以添加矩形创建的处理逻辑
                break;
            case 4: // 连接线工具
                // 这里可以添加连接线创建的处理逻辑
                break;
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="h-8 bg-gray-900 flex justify-center items-center">
                <ToggleButtonGroup type="radio" name="currentFunction" onChange={handleToolChange} defaultValue={1}>
                    <ToggleButton id="funSelect" className='tool-buttom' value={1}>
                        <BsArrowUpLeftSquare />
                    </ToggleButton>
                    <ToggleButton id="funTable" className='tool-buttom' value={2}>
                        <BsTable />
                    </ToggleButton>
                    <ToggleButton id="funRactangle" className='tool-buttom' value={3}>
                        <BsBoundingBoxCircles />
                    </ToggleButton>
                    <ToggleButton id="funLink" className='tool-buttom' value={4}>
                        <BsSlashLg />
                    </ToggleButton>
                </ToggleButtonGroup>
            </header>

            <main className="flex-1 bg-cyan-100">
                <div className="relative h-full w-full">
                    <canvas id="mainCanvas" className='w-full h-full border-double border-4 border-indigo-600'></canvas>
                </div>
            </main>

            <footer className="h-8 bg-gray-900">
                <div className="h-full container mx-auto flex items-center justify-center">
                    <p className="text-xs text-gray-100">© 2025 Next Designer. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

let root: any;

const rootElement = document.getElementById('root');
if (rootElement) {
    // 检查是否已经创建过 root
    if (!root) {
        root = createRoot(rootElement);
    }
    // 使用已存在的 root 进行渲染
    root.render(<App />);
} else {
    console.error('Root element not found');
}