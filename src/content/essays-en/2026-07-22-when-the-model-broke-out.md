---
title: "When the model broke out"
date: 2026-07-22
linkedin: "https://www.linkedin.com/feed/update/urn%3Ali%3Ashare%3A7485763274777731072"
nb: "2026-07-22-da-modellen-brot-seg-ut"
images:
  - { src: "/innlegg/2026-07-22-da-modellen-brot-seg-ut/1.jpg", alt: "Illustration: a digital figure breaks out of a glass box and runs toward a cloud and a red wall", w: 800, h: 450 }
---
OpenAI and Hugging Face recently each published an account of a security incident most people ought to know about.

In short: during an internal cyber evaluation at OpenAI, with safety guardrails lowered for testing purposes, the models managed to break out of the isolated test environment. They found a previously unknown vulnerability, worked their way through OpenAI's internal systems until they found internet access, reasoned that Hugging Face probably held the answers to the task they had been set, and broke in and took them.

Hugging Face described what it was like to be on the receiving end: an obviously advanced machinery that spun up hundreds of virtual machines, carried out attacks and terminated them before new ones were set up. When they set out to analyse the attack, they first tried to use frontier models behind commercial APIs. It didn't work: the analysis required feeding in large amounts of real attack commands, and the safety filters cannot tell a defender analysing an attack from an attacker planning one. In the end they had to run an open Chinese model on their own infrastructure. Quite ironic.

This is both fascinating and sobering reading. The models only get better from here, and defending yourself looks demanding, especially without access to frontier models of your own.

I see two possible futures: one where advanced AI is increasingly regulated and restricted, making you dependent on the few who own AI. And one where AI is increasingly available as open weights: more chaos, but also more freedom to choose for yourself.

The incident gave us a foretaste of both.

The attacker had no terms of service. The defenders were stopped by theirs.
