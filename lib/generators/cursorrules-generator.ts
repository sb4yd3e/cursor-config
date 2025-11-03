import { ProjectFormData } from '@/types';
import { generateGeneralRules } from '../templates/cursorrules/general';
import { generateWebRules } from '../templates/cursorrules/web';
import { generateMobileRules } from '../templates/cursorrules/mobile';
import { generateDataScienceRules } from '../templates/cursorrules/data-science';
import { generateDevOpsRules } from '../templates/cursorrules/devops';

export function generateCursorRules(data: ProjectFormData): string {
  // Start with general rules
  let cursorRules = generateGeneralRules(data);
  
  // Add domain-specific rules
  if (data.domain.includes('web')) {
    cursorRules += '\n\n' + generateWebRules(data);
  } else if (data.domain.includes('mobile')) {
    cursorRules += '\n\n' + generateMobileRules(data);
  } else if (data.domain === 'data-science') {
    cursorRules += '\n\n' + generateDataScienceRules(data);
  } else if (data.domain === 'devops') {
    cursorRules += '\n\n' + generateDevOpsRules(data);
  }
  
  return cursorRules;
}

