'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';

export default function NuevoInforme() {
	const [numeroReferencia, setNumeroReferencia] = useState('');
	const [titulo, setTitulo] = useState('');
	const [contenidoGenerado, setContenidoGenerado] = useState('');
	const router = useRouter();

	const guardarInforme = async () => {
		if (!numeroReferencia || !titulo || !contenidoGenerado) {
			alert('Por favor completa todos los campos');
			return;
		}

		try {
			const response = await fetch('/api/informes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					numeroReferencia,
					titulo,
					contenido: contenidoGenerado,
				}),
			});

			if (response.ok) {
				const informe = await response.json();
				router.push(`/informe/${informe.id}`);
			}
		} catch (error) {
			console.error('Error guardando informe:', error);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Nuevo Informe Justificativo</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div>
					<h2 className="text-xl font-semibold mb-4">
						Información del Informe
					</h2>

					<div className="space-y-4 mb-6">
						<div>
							<label className="block text-sm font-medium mb-2">
								Número de Referencia
							</label>
							<input
								type="text"
								value={numeroReferencia}
								onChange={(e) => setNumeroReferencia(e.target.value)}
								className="w-full px-3 py-2 border rounded-md"
								placeholder="Ej: INF-2024-001"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">
								Título del Informe
							</label>
							<input
								type="text"
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
								className="w-full px-3 py-2 border rounded-md"
								placeholder="Título descriptivo del informe"
							/>
						</div>
					</div>

					<h3 className="text-lg font-semibold mb-4">Chat con IA</h3>
					<ChatInterface onInformeGenerado={setContenidoGenerado} />
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-4">
						Vista Previa del Informe
					</h2>

					<div className="border rounded-lg p-4 bg-gray-50 min-h-96">
						{contenidoGenerado ? (
							<div className="whitespace-pre-wrap">{contenidoGenerado}</div>
						) : (
							<p className="text-gray-500 italic">
								El contenido del informe aparecerá aquí cuando uses el chat...
							</p>
						)}
					</div>

					<div className="mt-6 flex gap-4">
						<button
							onClick={guardarInforme}
							className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
							disabled={!contenidoGenerado}
						>
							Guardar Informe
						</button>

						<button
							onClick={() => setContenidoGenerado('')}
							className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
						>
							Limpiar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
