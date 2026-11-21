---
title: "Who fixes it when the AI cannot?"
date: 2026-11-20
linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7529479596346449921/"
nb: "2026-11-20-hvem-fikser-det-nar-ki-en-ikke-kan"
images:
  - { src: "/innlegg/2026-11-20-hvem-fikser-det-nar-ki-en-ikke-kan/1.jpg", alt: "Dark infographic about the US flight stoppage on 13 November 2026, showing its duration, affected air traffic control centres and aircraft in the air, with a note on working radars and controllers’ manual work.", w: 1080, h: 1350 }
---
On Friday 13 November, all aircraft in the US were grounded for more than four hours. The Federal Aviation Administration's network was flooded with data, probably from a newly installed router, and 17 of 22 air traffic control centres had unstable radar and communications. The day before, Microsoft's email, Teams and Copilot had gone down for more than a day. A bug from July, more traffic and less capacity struck at the same time, and the automatic rollback could not save it.

Neither incident was caused by AI. But look at what saved air traffic: some radio frequencies and radars still worked, and air traffic controllers who could work without the usual system got every aircraft safely down.

I am all in on AI. My agents write more code than I will ever read. But for critical infrastructure, and ultimately nuclear weapons, we must be sure that people can understand, troubleshoot and operate the system when the AI is unavailable.

We lost the overview long before AI. Nobody, or very few people, understand the whole Linux kernel or the banks' old COBOL. What saves us is that some people understand their part, that we can roll back, and that a manual fallback exists.

AI changes four things:
- Code grows faster than anyone can read it
- Skills atrophy. The better the automation, the less capable the human becomes when it fails
- Failures are connected. Similar models have similar blind spots across many systems at once
- The AI that created the fault often has the same blind spot when it tries to find it

The most dangerous thing is a human who is merely decoration: formally in the loop, but approving what the system suggests. Stanislav Petrov did not trust the warning system in 1983, and he was right. That scepticism fades when the system has been right ten thousand times.

When hackers took control of Ukraine's power grid in 2015, it was technicians who drove out and switched it back manually. Norwegian power companies are supposed to have plans for operating facilities manually if the control system fails. The same thinking must apply to AI.

My proposal for critical systems:
1. People own the specification, though not necessarily the code
2. The system can be restored without AI: a known working version, a fallback mode and a tested manual procedure. Like being able to navigate with a map when the GPS fails.
3. Practise as they do in aviation: resolve incidents without AI assistance regularly
4. A limit on complexity: critical code that nobody can understand is not acceptable
5. Stricter requirements the worse the potential outcome, the harder the damage is to reverse and the faster it must be fixed

AI is welcome for analysis and alerts. But the decision, the fallback and the understanding must be human, and practised.

The question whose answer I do not entirely like: how much of my own AI-built setup could I repair myself? I have chosen speed and functionality over oversight. I can do that because the risk and the consequences are low.

And where is the line? Hospitals, payment systems, waterworks?

#AI #Preparedness #CriticalInfrastructure #Cybersecurity
