/* =========================================================
   SafeHerAI — Emergency Service
   Emergency action abstraction.

   Current stage:
   - Safe UI/demo callbacks

   Future:
   - device calling
   - location sharing
   - backend emergency workflow
   ========================================================= */

const EMERGENCY_CONTACTS = {
  police: {
    type: "police",
    label: "Police Assistance",
    number: "100",
  },

  medical: {
    type: "medical",
    label: "Medical Assistance",
    number: "108",
  },
};

export function getEmergencyContact(type) {
  return EMERGENCY_CONTACTS[type] ?? null;
}

export function getEmergencyContacts() {
  return {
    ...EMERGENCY_CONTACTS,
  };
}

export async function requestPoliceAssistance({
  location = null,
} = {}) {
  const contact = getEmergencyContact("police");

  return {
    success: true,
    type: contact.type,
    label: contact.label,
    number: contact.number,
    location,
    mode: "demo",
  };
}

export async function requestMedicalAssistance({
  location = null,
} = {}) {
  const contact = getEmergencyContact("medical");

  return {
    success: true,
    type: contact.type,
    label: contact.label,
    number: contact.number,
    location,
    mode: "demo",
  };
}

export async function activateSOS({
  location = null,
} = {}) {
  return {
    success: true,
    type: "sos",
    location,
    mode: "demo",
    message:
      "SOS action prepared for emergency workflow.",
  };
}