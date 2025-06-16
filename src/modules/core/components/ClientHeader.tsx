import { BaseHeader } from './BaseHeader';
import { clientLinks } from '../constants/links.const';
export default (p: any) => <BaseHeader {...p} links={clientLinks} showSearch />;