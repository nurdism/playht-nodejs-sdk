import { Request, Response } from 'express';
import * as PlayHTAPI from '../../dist';

export async function uploadInstantClone(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const voiceName: string | undefined = req.body.voiceName;
  if (!voiceName) {
    return res.status(400).send('Voice name is missing.');
  }

  const fileBuffer = req.file.buffer;

  try {
    // Call the API
    const clonedVoice = await PlayHTAPI.instantCloneFromFile(voiceName, fileBuffer);

    res.status(200).json(clonedVoice);
  } catch (error: any) {
    console.error(error);
    res.statusMessage = error?.message;
    res.status(error?.status || 500).send();
  }
}
