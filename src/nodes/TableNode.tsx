import { NodeProps } from '@xyflow/react';

export default function TableNode({ data }: NodeProps) {
    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md">
            <div className="bg-blue-600 text-white p-2 font-bold rounded-t-md">
                {String(data.tableName)}
            </div>
            <div className="divide-y divide-gray-200">
                {(data.fields as any[]).map((field, index) => (
                    <div key={index} className="p-2 flex justify-between">
                        <div className="flex items-center">
                            {field.isPK && <span className="text-xs bg-yellow-500 text-white px-1 rounded mr-1">PK</span>}
                            <span>{field.name}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{field.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}