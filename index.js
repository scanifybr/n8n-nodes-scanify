import { Scanify } from './nodes/Scanify/Scanify.node';
import { ScanifyApi } from './credentials/ScanifyApi.credentials';
import { ScanifyTrigger } from './nodes/ScanifyTrigger/ScanifyTrigger.node';

export const nodes = [
	Scanify, ScanifyTrigger,
];

export const credentials = [
	ScanifyApi,
];
