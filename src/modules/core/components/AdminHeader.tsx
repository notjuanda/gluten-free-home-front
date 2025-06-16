import { BaseHeader } from './BaseHeader';
import { adminLinks } from '../constants/links.const';
export default (p: any) => <BaseHeader {...p} links={adminLinks} />;