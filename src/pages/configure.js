//const baseDomain = "https://serve-v1.evean.net"; //https://ekal.evean.net
const baseDomain = "https://serve-v1.evean.net";
const baseDomainNeed = "https://serve-v1.evean.net"
const baseDomainFulfill = "https://serve-v1.evean.net"
const baseDomainVolunteering = "https://serve-v1.evean.net"

const configData = {
    "USER_GET" : `${baseDomainVolunteering}/api/v1/serve-volunteering/user`,
    "NEED_GET": `${baseDomainNeed}/api/v1/serve-need/need`,
    "NEED_SEARCH": `${baseDomainFulfill}/api/v1/serve-fulfill/nomination`,
    "NEED_FULFILL":`${baseDomainFulfill}/api/v1/serve-fulfill/nomination`,
    "NEEDTYPE_GET": `${baseDomainNeed}/api/v1/serve-need/needtype`,
    "ENTITY_GET": `https://serve-v1.evean.net/api/v1/entity`,
    "NEED_POST" : `${baseDomainNeed}/api/v1/serve-need/need/raise`,
    "NEED_BY_TYPE" : `${baseDomainNeed}/api/v1/need/serve-need/need-type/create`,
    "NOMINATED_USER_FETCH" : `${baseDomainVolunteering}/api/v1/serve-volunteering/user`,
    "NEED_BY_USER" : `${baseDomainNeed}/api/v1/serve-need/need/user`,
    "NOMINATION_CONFIRM" : `${baseDomainFulfill}/api/v1/serve-fulfill/nomination/{needId}/nominate`,
    "NEED_REQUIREMENT_GET": `${baseDomainNeed}/api/v1/serve-need/need-requirement`,
    "NOMINATIONS_GET": `${baseDomainFulfill}/api/v1/serve-fulfill/nomination`,
    "NEEDPLAN_GET": `${baseDomainNeed}/api/v1/serve-need/need-plan`,
    "NEEDPLAN_DELIVERABLES": `${baseDomainNeed}/api/v1/serve-need/need-deliverable`
}

module.exports = configData;
