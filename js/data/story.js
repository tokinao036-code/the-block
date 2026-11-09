// What happened in each episode — the AI characters get this as shared story memory.
export const STORY = {
  w1l1: "Max moved into an apartment in Bushwick, Brooklyn, and met Jay, his next-door neighbor, on the stoop. Jay works at a sneaker store and makes beats at night; his mom hates the noise.",
  w1l2: "Max and Liam got coffee in Williamsburg. Max was shocked that the card screen asked for a 20% tip, and the barista wrote his name as 'Mike'.",
  w1l3: "After Max's first marketing class, Ty explained the syllabus. Max hadn't checked his email and has a two-page essay due Friday; Ty offered to study with him at the library.",
  w1l4: "Ty took Max to his first real leg day at the campus gym. Max couldn't feel his legs afterwards and said he hates leg day.",
  w1l5: "Max's first day as a marketing intern at Northside Media in Manhattan. Maya is his mentor; he's doing social media research for a sneaker brand campaign and sent his first intro email to the team.",
  w1l6: "Jay threw a rooftop party in Bushwick. Max met Jay's cousin Diego from LA, said he can't dance, and Diego said nobody there can.",
  w1l7: "Jay took Max to 1520 Sedgwick Avenue in the Bronx, where DJ Kool Herc's 1973 party gave birth to hip-hop. Jay invited Max to an open mic.",
  w2l1: "Max flew to Chicago for a week at Northside's Chicago office. The flight was bumpy and a guy spilled coffee on his laptop bag. Maya met him at O'Hare and they took the L downtown.",
  w2l2: "Max had dinner with Maya's family in Bronzeville and met her younger brother Marcus, who grilled him about deep dish vs New York pizza. Max admitted deep dish is unreal.",
  w2l3: "Max's client pitch almost failed: someone had changed the projector settings, so he presented from his laptop. He owned the mistake, wrote a follow-up email, and the client later signed.",
  w2l4: "Marcus took Max to a pickup basketball game in Washington Park. Max had never played; Marcus told the story of an old man who destroyed him when he was twelve.",
  w2l5: "Max and Marcus got stranded after a concert: the train line was closed and both phones died. They walked an hour in the wind and a pizza place let them charge their phones and gave them free slices. Max told Liam the whole story on FaceTime.",
  w2l6: "Marcus showed Max a record store and explained that house music was born in Chicago at the Warehouse with Frankie Knuckles, and that drill started in Chicago before Brooklyn.",
  w2l7: "Max came back to Brooklyn and told Jay everything about Chicago. Jay admitted Marcus is right about drill, but doesn't want him to know.",
  w3l1: "Spring break: Ty drove Max to his family home in Atlanta. Ty's mom welcomed them with a huge Southern dinner and loved Max's manners.",
  w3l2: "At Sunday dinner Max met Ty's cousin Keisha, a content creator with 500K followers, and offered to help with her sneaker brand video.",
  w3l3: "Ty played a charity basketball game at his old high school against his rival Darius and won with a huge dunk; Keisha and Max cheered.",
  w3l4: "Max came up with the idea of 'three generations of sneakers' for Keisha's brand video; they planned the shoot for Wednesday.",
  w3l5: "Keisha took Max to a legendary Atlanta trap studio; Jay was jealous on FaceTime and asked Max to put in a good word for his beats.",
  w3l6: "A storm knocked out the power in Atlanta; Max couldn't save his essay but had emailed half of it to himself, and asked Professor Miller for an extension.",
  w3l7: "Keisha's video went viral (1M+ views). On the last night in Atlanta, Ty said Max is family now; Max promised to come back for Thanksgiving.",
  w4l1: "Max flew to Los Angeles to visit Diego, who picked him up at LAX; they talked about LA traffic and tacos.",
  w4l2: "Diego taught Max to skate at Venice Beach; Max fell and Zoe, a film student, filmed it as the opening shot of her skate documentary.",
  w4l3: "Zoe and Max watched the sunset at Griffith Observatory and talked about dreams; Zoe's parents wanted her to be a lawyer.",
  w4l4: "Max helped Diego negotiate the rent for his dream café on Abbot Kinney: three-year lease, lower rent, a free month.",
  w4l5: "A small earthquake (about 4.2) hit while Max was making coffee at Diego's; some mugs broke, nobody was hurt.",
  w4l6: "Zoe took Max and Diego to Compton for her doc about LA hip-hop (N.W.A, Dr. Dre, Kendrick); Marcus kept texting that Chicago did it better.",
  w4l7: "Last sunset in LA with Diego and Zoe, Jay and Ty on FaceTime. Max is flying home to Brooklyn after a month across America.",
};

// Who knows whom (so characters can mention each other naturally).
export const RELATIONS = "Keisha is Ty's cousin in Atlanta. Zoe is Diego's friend in LA. Jay (Brooklyn neighbor) and Diego (LA) are cousins. Liam and Ty are Max's classmates in New York. Maya is Max's mentor at work; Marcus is Maya's younger brother in Chicago. Jay and Marcus argue about Brooklyn vs Chicago drill.";

import { MORE_STORY } from './more.js';
Object.assign(STORY, MORE_STORY);
