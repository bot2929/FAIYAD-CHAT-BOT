const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস ফাইয়াদ রে হাঙ্গা করো😶👻😘",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "help": "Prefix de sala",
    "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "bc": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "tor bal": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "Faiyad": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ ♡𝗘𝘄'𝗿 𝗙𝗮𝗶𝘆𝗮𝗱♡☜\nFacebook: https://www.facebook.com/ahmed.z.faiyad.2025 WhatsApp : +8801922675511",
    "admin": "He is —͟͟͞͞𝐅𝐚𝐢̽𝐲𝐚𝐝 ᰔᩚ: ›🩵 তাকে সবাই ভদ্র ছেলে হিসেবে চিনে😘☺️",
    "babi": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ চুপ কর পাগল ছাগল",
    "assalamualaikum": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ 💖",
    "fork": "https://github.com/shahadat-sahu/SHAHADAT-CHAT-BOT.git",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭
      ",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস  ফাইয়াদকে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": "মেয়ে হলে আমার বস ফাইয়াদ এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami faiyad": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝗙𝗮𝗶𝘆𝗮𝗱'𝘀 𝗖𝗵𝗮𝘁 𝗯𝗼𝘁💖",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "boda": " কার তোর?..!🌚🤣",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss ফাইয়াদ এর ইনবক্সে গুতা দিন 😘",
    "kire ki koros": "তোমার কথা ভাবতে ছি জানু",
    "kire bot": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈",
    "bot": "তোমার আম্মুরে আইলাবিউ😽🙊",
    "ki": " তোমারে কী দু*চছিলাম আমি?..!🤩😚",
    "onek vodro": " জ্বী একদম আপনার ধারনার ও বাইরে",
    "aho tmke cdi": " তোর ধ*নে পাতায় জোর নেই তোর আব্বুকে পাঠা😇💋",
    "hmm": " হুম হুম না করে ভালোবাসি ও তহ্ বলতে পারিস.!🌚🫦",
    "ohh": " কি তোমার জি'এফ আমার!😳🤚",
    "jaiga": " ধরে কে রাখছে তোকে?..!🤣",
    "i love you": " ভালোবাসা শুধু আমার বস ফাইয়াদ এর জন্যই?..!😊🙌",
    "cdi": " তোর দ্বারা সম্ভব নয় তোর আব্বুকে পাঠা ..!😁👍",
    "Fuck you": " পু*ক্কিডা ঘুরাও গুলি করি?..!🤡🔫",
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
