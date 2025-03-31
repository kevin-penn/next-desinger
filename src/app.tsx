import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { BsArrowUpLeftSquare, BsTable, BsBoundingBoxCircles, BsSlashLg } from 'react-icons/bs';
import './global.css';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <div className="flex flex-col h-screen">
            <header className="h-8 bg-gray-900 flex justify-center items-center">
                <ToggleButtonGroup
                    type="radio"
                    name="currentFunction"
                    defaultValue={1}
                >
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

            <main className="flex-1 bg-green-100">
                <div className="relative h-full w-full">
                    <canvas className='w-full h-full bg-blue-100'></canvas>
                </div>
            </main>

            <footer className="h-8 bg-gray-900">
                <div className="h-full container mx-auto flex items-center justify-center">
                    <p className="text-xs text-gray-100">© 2025 Next Designer. All rights reserved.</p>
                </div>
            </footer>
        </div>);
} else {
    console.error('Root element not found');
}