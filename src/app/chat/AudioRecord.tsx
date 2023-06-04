'use client';

import { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

export default function AudioRecord() {
	const [recording, setRecording] = useState(false);

	return (
		<div>
			<ReactMediaRecorder
				audio
				render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
					<div>
						{!recording ? (
							<button
								onClick={() => {
									setRecording(true);
									startRecording();
								}}
							>
								Start Recording
							</button>
						) : (
							<button
								onClick={() => {
									setRecording(false);
									stopRecording();
								}}
							>
								Stop Recording
							</button>
						)}

						{/* 다운로드 */}
						<a href={mediaBlobUrl} download="my-audio-file.mp3">
							Download
						</a>
						<audio src={mediaBlobUrl} controls />
					</div>
				)}
			/>
		</div>
	);
}
