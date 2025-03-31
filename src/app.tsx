import { createRoot } from 'react-dom/client';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { BsArrowUpLeftSquare, BsTable, BsBoundingBoxCircles, BsSlashLg } from 'react-icons/bs';
import './global.css';
import { useState, useRef } from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from './nodes/TableNode';

const nodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
    },
];

const App = () => {

    const [nodes, setNodes] = useState([
        {
            id: '1',
            type: 'table',
            position: { x: 100, y: 100 },
            data: {
                tableName: 'Users',
                fields: [
                    { name: 'id', type: 'INT', isPK: true },
                    { name: 'username', type: 'VARCHAR(50)' },
                    { name: 'email', type: 'VARCHAR(100)' },
                    { name: 'created_at', type: 'TIMESTAMP' }
                ]
            }
        }
    ]);

    const handleToolChange = (toolValue: number) => {

        switch (toolValue) {
            case 1: // 选择工具
                break;
            case 2: // 表格工具
                // 创建表格绘制器

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

            <main className="flex-1">
                <div className="relative h-full w-full">
                    <ReactFlow proOptions={{ hideAttribution: true }} nodes={nodes} nodeTypes={{ table: TableNode }} style={{ cursor: 'grab' }}>
                        <Background />
                        <Controls />
                    </ReactFlow>
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