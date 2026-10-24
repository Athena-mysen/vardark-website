---
title: "The defenders' window may be closing"
date: 2026-09-02
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7500674080157687809/"
nb: "2026-09-02-det-kan-virke-som-at-forsvarernes-vindu-er-i-ferd-med-a-lukk"
images:
  - { src: "/innlegg/2026-09-02-det-kan-virke-som-at-forsvarernes-vindu-er-i-ferd-med-a-lukk/1.jpg", alt: "Drawing: a small AI robot with a shield defends a wall against a swarm of attacking robots", w: 1536, h: 1024 }
---
When OpenAI agents attacked Hugging Face, the attack generated around 17,600 actions. Hugging Face writes that a manual reconstruction of the attack was practically impossible. Commercial frontier models refused to analyse large parts of the material because they could not tell defence from attack.

So Hugging Face downloaded an open Chinese model, GLM-5.2, and ran it on its own hardware.

The model decrypted payloads, correlated thousands of actions and helped the security team understand what had happened. The humans shut down the vulnerable renderer and cut off access. In other words, the model did not stop the attack on its own.

But without AI, the defenders would barely have had time to understand it.

When I first wrote about the incident, the point was that the attacker had broken out. Later the investigation showed that the agents had also organised themselves, divided up work and shared techniques faster than a human security team could respond.

Now comes the third consequence:

This capability is becoming common property, fast.

Example: GLM-5.3, an LLM almost on par with the best from OpenAI and Anthropic, has already been published as open weights. Z.ai says it solved 105 ExploitGym tasks in two hours, against 29 for the previous generation. Variants modified to reduce refusals on offensive cyber tasks can be downloaded without obstacles. You can even rent it.

This means AI-augmented cyber defence will soon go from being an advantage to being a prerequisite.

When hostile agents can attack continuously, in parallel and at machine speed, an unaugmented security team will not be able to keep up. Not because the people lack skill, but because they lack the numbers, the stamina and the speed.

AI defence is not a magic solution either. It does not replace least privilege, segmentation, patching, rotating secrets, observability or recovery plans. It becomes the layer that lets these mechanisms be applied at the same tempo as the attack.

The defenders' window is not the time before attackers get AI. They already have it. The window is the time before extreme agent capability becomes cheap, persistent and available to almost everyone. Soon, humans will not be defending infrastructure against agents.

The agents will attack, and only other agents will be able to keep up.
