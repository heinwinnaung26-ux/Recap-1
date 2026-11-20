import { useState } from 'react';
import DialogBox from '../Common/DialogBox';
import Button from '../Common/Button';
import { useVideo } from '../../contexts/VideoContext';
import { saveHistoryItem } from '../Dashboard/EditingHistory';
import { uid } from '../../utils/helpers';
export default function SaveConfigDialog() { const [open, setOpen] = useState(false); const [name, setName] = useState(''); const { project } = useVideo(); return <div><Button onClick={() => setOpen(true)}>Config သိမ်းမယ်</Button>{open && <DialogBox title="Save Config" onClose={() => setOpen(false)}><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" className="w-full rounded border px-2 py-1" /><div className="mt-3"><Button onClick={() => { saveHistoryItem({ id: uid(), title: name || project.title, at: new Date().toISOString() }); setOpen(false); }}>သိမ်းမယ်</Button></div></DialogBox>}</div>; }
