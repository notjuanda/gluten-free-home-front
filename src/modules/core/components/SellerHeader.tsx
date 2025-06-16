import { BaseHeader } from './BaseHeader';
import { sellerLinks } from '../constants/links.const';
export default (p: any) => <BaseHeader {...p} links={sellerLinks} />;