import SubtitleUploader from '../components/Subtitles/SubtitleUploader';
import SubtitleEditor from '../components/Subtitles/SubtitleEditor';
import FontDesigner from '../components/Subtitles/FontDesigner';
import SubtitleBackground from '../components/Subtitles/SubtitleBackground';
import TranslationTools from '../components/Subtitles/TranslationTools';
import SubtitleStreaming from '../components/Subtitles/SubtitleStreaming';
export default function SubtitlesEditing() { return <div className="space-y-4"><h2 className="text-2xl font-bold">Subtitles Editing</h2><div className="grid gap-4 lg:grid-cols-2"><SubtitleUploader /><TranslationTools /><FontDesigner /><SubtitleBackground /></div><SubtitleEditor /><SubtitleStreaming /></div>; }
