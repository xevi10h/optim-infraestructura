'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface Mensaje {
	tipo: 'user' | 'assistant';
	contenido: string;
	timestamp: Date;
}

export default function ChatInterface({
	onInformeGenerado,
}: {
	onInformeGenerado: (contenido: string) => void;
}) {
	const [mensajes, setMensajes] = useState<Mensaje[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [cargando, setCargando] = useState(false);

	const enviarMensaje = async () => {
		if (!inputValue.trim()) return;

		const nuevoMensaje = {
			tipo: 'user' as const,
			contenido: inputValue,
			timestamp: new Date(),
		};

		setMensajes((prev) => [...prev, nuevoMensaje]);
		setCargando(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					mensaje: inputValue,
					conversacion: mensajes,
				}),
			});

			const data = await response.json();

			const respuestaIA = {
				tipo: 'assistant' as const,
				contenido: data.respuesta,
				timestamp: new Date(),
			};

			setMensajes((prev) => [...prev, respuestaIA]);
			onInformeGenerado(data.respuesta);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setCargando(false);
			setInputValue('');
		}
	};

	return (
		<div className="flex flex-col h-96 border rounded-lg">
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{mensajes.map((mensaje, index) => (
					<div
						key={index}
						className={`flex ${
							mensaje.tipo === 'user' ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
								mensaje.tipo === 'user'
									? 'bg-blue-500 text-white'
									: 'bg-gray-100 text-gray-800'
							}`}
						>
							{mensaje.contenido}
						</div>
					</div>
				))}
				{cargando && (
					<div className="flex justify-start">
						<div className="bg-gray-100 px-4 py-2 rounded-lg">
							Generando respuesta...
						</div>
					</div>
				)}
			</div>

			<div className="border-t p-4 flex gap-2">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
					placeholder="Describe qué informe justificativo necesitas..."
					className="flex-1 px-3 py-2 border rounded-md"
					disabled={cargando}
				/>
				<button
					onClick={enviarMensaje}
					disabled={cargando || !inputValue.trim()}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
				>
					<Send size={20} />
				</button>
			</div>
		</div>
	);
}
