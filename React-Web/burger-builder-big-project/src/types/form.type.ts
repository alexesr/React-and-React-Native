import { ChangeEvent } from 'react';

type InputElementType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export type FormChangeEventType = ChangeEvent<InputElementType>;