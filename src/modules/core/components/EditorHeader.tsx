import { BaseHeader } from './BaseHeader';
import { editorLinks } from '../constants/links.const';
export default (p: any) => <BaseHeader {...p} links={editorLinks} />;