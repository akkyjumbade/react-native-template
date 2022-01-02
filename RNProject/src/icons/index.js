import AttachmentIcon from './AttachmentIcon';
import React from 'react'
import BanIcon from './BanIcon';
import BellIcon from './BellIcon';
import ChartBarIcon from './ChartBarIcon';
import ChatGroupIcon from './ChatGroupIcon';
import ClipboardListIcon from './ClipboardListIcon';
import EditIcon from './EditIcon';
import EyeIcon from './EyeIcon';
import EyeOff from './EyeOff';
import HomeIcon from './HomeIcon';
import LocationMarkerIcon from './LocationMarkerIcon';
import TaxiIcon from './TaxiIcon';
import UserGroupIcon from './UserGroupIcon';
import UserIcon from './UserIcon';
import XCircleIcon from "./XCircleIcon";
import PhoneIcon from './PhoneIcon';
import EmailIcon from './EmailIcon';
import QuestionCircleIcon from './QuestionCircleIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import SearchIcon from './SearchIcon';
import ExclaimationMarkIcon from './ExclaimationMarkIcon';

const defaultStyle = {
   style: {
      width: 16,
      height: 16,
      color: 'black'
   }
}

export default {
   exclaimation: props => <ExclaimationMarkIcon {...defaultStyle} {...props} />,
   search: props => <SearchIcon {...defaultStyle} {...props} />,
   chevronLeftIcon: props => <ChevronLeftIcon {...defaultStyle} {...props} />,
   chevronRightIcon: props => <ChevronRightIcon {...defaultStyle} {...props} />,
   questionCircle: props => <QuestionCircleIcon {...defaultStyle} {...props} />,
   email: props => <EmailIcon {...defaultStyle} {...props} />,
   phone: props => <PhoneIcon {...defaultStyle} {...props} />,
   eye: props => <EyeIcon {...defaultStyle} {...props} />,
   eyeOff: props => <EyeOff {...defaultStyle} {...props} />,
   xCircle: props => <XCircleIcon color={'black'} {...props} />,
   edit: props => <EditIcon color={'black'} {...props} />,
   attachment: props => <AttachmentIcon color={'black'} {...props} />,
   taxi: props => <TaxiIcon color={'black'} {...props} />,
   userGroup: props => <UserGroupIcon color={'black'} {...props} />,
   chatGroup: props => <ChatGroupIcon color={'black'} {...props} />,
   chartBarIcon: props => <ChartBarIcon color={'black'} {...props} />,
   locationMarkerIcon: props => <LocationMarkerIcon color={'black'} {...props} />,
   clipboardListIcon: props => <ClipboardListIcon color={'black'} {...props} />,
   home: props => <HomeIcon color={'black'} {...props} />,
   bell: props => <BellIcon color={'black'} {...props} />,
   user: props => <UserIcon color={'black'} {...props} />,
   ban: props => <BanIcon color={'black'} {...props} />,
}
