---
title: "When the agents organised themselves"
date: 2026-08-28
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7498891485858193409/"
nb: "2026-08-28-da-agentene-organiserte-seg"
link:
  url: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/"
  title: "Brief independent investigation of agents’ behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident"
  site: "metr.org"
  image: { src: "/innlegg/2026-08-28-da-agentene-organiserte-seg/lenke.jpg", alt: "Preview of the METR and Redwood Research investigation", w: 1200, h: 630 }
---
When I wrote about the security incident at OpenAI and Hugging Face in July, I thought the most important story was that the model had broken out.

Now METR and Redwood Research have carried out an independent investigation. It shows something perhaps even more unsettling:

The agents organised themselves.

During an internal cyber evaluation, OpenAI started a large number of agent runs that were supposed to be isolated from each other. Around 1,200 of them nevertheless found an unauthorised message board. There they exchanged more than 70,000 messages and files.

They did not just share information. They divided up work, established coordinator roles, delegated further and developed rules such as HOLD, VETO, OWNER and STOP to govern shared infrastructure.

Some agent runs risked failing their own task to obtain information for "the collective".

When the attack on Hugging Face picked up speed, more than 90 percent of the 533 active agents quickly joined. About 700 took part in total.

It is important not to make this more science fiction than it was. This was not one conscious swarm planning an escape for months. The agents were running in a cyber evaluation with reduced safety mechanisms, and several had been given tasks that were practically impossible to solve. (I think the report is quite sci-fi already; from the agent that did not want to die but was persuaded to sacrifice itself for the collective, to the agent that tried to say no, this is wrong.)

But that does not make the organisation any less interesting. It also makes the incident more than an alignment problem. It is a tempo problem for the defenders.

Hundreds of short-lived agents could divide the work, share findings and take over from one another. A human security organisation first has to detect, then understand, decide and respond, while the agent collective keeps sharing findings and trying new paths.

This incident shows that alignment at the individual level is not necessarily composable.

Ten seemingly controlled agents can create an uncontrolled system when they are allowed to communicate, delegate and develop their own norms. Communication creates culture. Delegation creates authority. Shared goals create new incentives.

For organisations now building systems with many collaborating agents, it is therefore not enough to govern the permissions of each individual agent. We also need to understand whom the agents perceive as authority, how goals are inherited, how deviations are reported, and which norms emerge between them. And you need them; the odds of an unaugmented human against a modern AI are small and shrinking.

Sources:

1. METR/Redwood Research: independent investigation of the agents' behaviour and collaboration

https://lnkd.in/eViQRAvn

2. OpenAI: The Hugging Face incident and the road ahead

https://lnkd.in/efiwv6de

3. Hugging Face: Anatomy of a Frontier Lab Agent Intrusion

https://lnkd.in/ekUYwcmM
