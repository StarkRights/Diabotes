# Diabotes
#### A Very hacked together and very not-reccomended-for-use API wrapper.

## What is this?
In short, this is a discord bot that a (strictly hypothetical) type-1 diabetic could use to (strictly hypothetically) display their bloodsugar within discord as its status, or used to retrieve it by command.

### Can I use this?

I would highly reccomend against it. To this end, I only provided functionality for the bot to work with **one** user, don't and won't host it for anyone other than myself, and explicitly recommend against it.

If you were to ignore me, clone the code, create all the necessary credentials for it to function, and run the service, please do not use it to inform any medical decisions. This code has had, and invariably will still have ***critical*** errors within it's lines that will report faulty data. 

This program is provided WITHOUT WARRANTY, and WITHOUT GUARANTEE OF ANY SPECIFIC FUNCTIONALITY. **DO NOT USE THIS TO INFORM MEDICAL DECISIONS**

## Okay, but really. What is this.

Alright, if you've read to here and continue to read, you understand that I promise nothing, and explicitly do not condone the use of this bot for yourself. I feel safe talking about it in a casual capacity now.

This is a bot that I made on a whim to report my CGM status to myself and my friends for a variety of reasons. It's a cool little novelty, and sometimes kind of useful to myself, seeing as sometimes discord is louder than/grabs my attention more than my phone.

### Requirements for use
- Own a nightscout-compatible CGM. 
- Own a running NightScout service.
- Own a discord bot application/token.

Those are pretty much the only requirements- just snag an access token from the nightscout dashboard, snag your bot's token from discord, and provide everything in the config file.
There's some leftover remnants from experimenting with OAuth and the dexcom API, but I ended up not using it and never deleting it either. 

### Functionality

- Reports bloodsugar levels in the bot's status
- Reports when data is stale (hasn't been updated recently)


### Info for potential devs
Hi! Half of the functioning code, probably pretty much everything dealing with nightscout, was likely hacked together in a sleepy daze after spending hours experimenting with the Dexcom API, only to find out that the info they serve is on a 2 hour time delay. I'm so sorry lol.

You can probably still see fragments of the dexcom API code lying around if you're curious and want to look into it. From what I remember, it's actually possible to apply for them to grant you realtime data access- they list various apps that very obviously operate on realtime data. However, I never looked into how to apply/get that permission, as I figured I could just spin up a nightscout instance instead. 

Nightscout is kind of hacky in and of itself though, so it's entirely understandable to want to try and poke that bear. Good luck, and shoot me an issue here if you ever find something out! As an aside though, there's some horrible practice going on in the dexcom stuff, à la rolling my own authentication. At the time, I was using this as an experiment in understanding OAuth requests and token lifecycles- please dear god if you do ever touch that, pull a reputable npm package and use it, lol.

If for some reason you do want to mess with this code, have any questions, or do end up using it and running into weird bugs, feel free to submit an issue in the issue tracker. I don't personally use this bot much at the moment as I'm not using my CGM, but I'm more than happy to take a peek if someone finds some use out of it.
