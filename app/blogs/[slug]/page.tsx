import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock3,
    Heart,
    Mail,
    PawPrint,
    Share2,
    UserRound,
} from "lucide-react";

import styles from "./BlogDetail.module.css";

type Blog = {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    readTime: string;
    date: string;
    image: string;
    intro: string;
    sections: {
        heading: string;
        paragraphs: string[];
    }[];
    takeaways: string[];
    note?: string;
};

const blogs: Blog[] = [
    {
        slug: "10-daily-habits-that-make-your-dog-happier-healthier",
        category: "Care Tips",
        title: "10 Daily Habits That Make Your Dog Happier & Healthier",
        excerpt:
            "Small, consistent habits can make a meaningful difference in your dog's everyday wellbeing, confidence, routine and relationship with you.",
        author: "PetCard Care Team",
        readTime: "5 min read",
        date: "August 28, 2026",
        image: "/images/huchiko2.png",
        intro:
            "A happier dog does not always need a complicated routine. In many cases, the biggest difference comes from small things done consistently: fresh water, regular movement, enough rest, positive interaction and time spent together. A predictable routine can also help dogs feel more secure because they learn what to expect throughout the day.",
        sections: [
            {
                heading: "1. Keep fresh water available",
                paragraphs: [
                    "Fresh drinking water should be easy for your dog to access throughout the day. Wash the bowl regularly and check that it has not become empty, especially during warmer weather or after physical activity.",
                    "Making hydration part of the everyday routine is simple, but it is one of the easiest habits to overlook when a busy day gets going."
                ],
            },
            {
                heading: "2. Make movement part of the day",
                paragraphs: [
                    "Walks and age-appropriate play give dogs a chance to move, explore and release energy. The right amount of exercise depends on factors such as age, breed, fitness and individual health.",
                    "Instead of thinking only about long walks, look at movement as something that can happen in several small sessions throughout the day."
                ],
            },
            {
                heading: "3. Give them mental stimulation",
                paragraphs: [
                    "Dogs need more than physical movement. Sniffing, puzzle toys, basic training games and interactive play can provide mental stimulation and help prevent boredom.",
                    "A five-minute training game can be surprisingly valuable when it asks your pet to think, focus and interact with you."
                ],
            },
            {
                heading: "4. Follow a consistent routine",
                paragraphs: [
                    "Feeding, walks, play and bedtime do not need to happen at exactly the same minute every day, but a predictable rhythm can make everyday life easier for both you and your dog.",
                    "A consistent routine also makes it easier to notice when something changes."
                ],
            },
            {
                heading: "5. Make time for grooming",
                paragraphs: [
                    "Brushing, nail care, ear checks and other grooming routines should be appropriate for your pet's coat and needs. Beyond cleanliness, grooming gives you a regular opportunity to notice changes in your pet's skin, coat or overall condition.",
                    "Turn grooming into a calm, positive routine instead of something that only happens when there is already a problem."
                ],
            },
            {
                heading: "6. Practice positive training",
                paragraphs: [
                    "Reward-based training can help build communication and confidence. Simple cues such as sit, stay, come and leave it can become part of ordinary household life.",
                    "Short, positive sessions are often more useful than long sessions that leave your pet frustrated or tired."
                ],
            },
            {
                heading: "7. Make rest a priority",
                paragraphs: [
                    "Dogs need downtime just as much as they need activity. Make sure your pet has a comfortable and quiet place where they can rest without constant interruption.",
                    "A dog that has enough opportunities to sleep and decompress is more likely to handle daily stimulation well."
                ],
            },
            {
                heading: "8. Spend one-on-one time together",
                paragraphs: [
                    "Your dog may enjoy toys, walks and treats, but attention from their favourite person matters too. A few uninterrupted minutes of play, cuddling or training can strengthen the bond you share.",
                    "These little moments often become the most meaningful part of a daily routine."
                ],
            },
            {
                heading: "9. Keep important health information organized",
                paragraphs: [
                    "Vaccination records, medications, veterinary visits and other important information are easier to manage when they are stored in one organized place.",
                    "Having those details accessible can also save valuable time when you need to remember a date, prepare for a veterinary visit or share information with another trusted guardian."
                ],
            },
            {
                heading: "10. Notice small changes",
                paragraphs: [
                    "You know your pet's normal behaviour better than anyone. Changes in appetite, activity, sleep, behaviour or other routines can be worth paying attention to.",
                    "A simple habit of observing your pet every day helps you recognise when their normal pattern changes."
                ],
            },
        ],
        takeaways: [
            "Consistency matters more than creating a complicated routine.",
            "Daily care should balance movement, mental stimulation and rest.",
            "Organised health information makes important moments easier to manage.",
            "Small positive interactions can strengthen the bond between pets and parents.",
        ],
    },

    {
        slug: "how-often-should-you-bathe-your-dog",
        category: "Care Tips",
        title: "How Often Should You Bathe Your Dog?",
        excerpt:
            "Bathing frequency depends on your dog's coat, lifestyle, activity level and individual needs. Here is how to build a practical bathing routine.",
        author: "PetCard Care Team",
        readTime: "4 min read",
        date: "August 26, 2026",
        image: "/images/reward/home-dog.png",
        intro:
            "There is no single bathing schedule that works for every dog. A dog who spends most of the day indoors may need a different routine from a dog who regularly plays outside, swims or gets muddy. The goal is not simply to bathe often, but to keep your pet clean while protecting their skin and coat.",
        sections: [
            {
                heading: "Start with your dog's lifestyle",
                paragraphs: [
                    "Think about where your dog spends time, how active they are and what kind of coat they have. Outdoor adventures, swimming and frequent exposure to dirt can naturally increase the need for baths.",
                    "At the same time, frequent bathing without considering your pet's skin and coat can create unnecessary dryness or irritation."
                ],
            },
            {
                heading: "Coat type makes a difference",
                paragraphs: [
                    "Short-coated dogs often require less intensive bathing and grooming than dogs with long or dense coats. Long coats may need regular brushing between baths to prevent tangles and keep dirt from building up.",
                    "Your veterinarian or professional groomer can help you understand the routine that best fits your dog's coat."
                ],
            },
            {
                heading: "Bathing is more than shampoo",
                paragraphs: [
                    "Brushing before a bath can help remove loose hair and surface dirt. Use products intended for dogs and follow the instructions for the product you choose.",
                    "Pay attention to water temperature, rinsing and drying. Residue left on the skin can become irritating, while incomplete drying can be uncomfortable for some dogs."
                ],
            },
            {
                heading: "Make bath time a positive experience",
                paragraphs: [
                    "Dogs can learn to associate grooming with positive experiences. Start slowly, reward calm behaviour and avoid turning the process into a stressful struggle.",
                    "The more predictable and calm the routine becomes, the easier future grooming sessions are likely to feel."
                ],
            },
            {
                heading: "When to ask a professional",
                paragraphs: [
                    "Persistent itching, unusual odour, visible skin changes, redness, hair loss or repeated discomfort should not simply be treated as a bathing problem.",
                    "When you notice a persistent change, speak with a veterinarian rather than changing grooming products repeatedly on your own."
                ],
            },
        ],
        takeaways: [
            "There is no universal bathing schedule for every dog.",
            "Lifestyle and coat type should guide the routine.",
            "Use products designed for dogs and rinse thoroughly.",
            "Persistent skin or coat changes deserve professional attention.",
        ],
    },

    {
        slug: "understanding-your-cats-body-language",
        category: "Care Tips",
        title: "Understanding Your Cat's Body Language",
        excerpt:
            "Cats communicate constantly through posture, ears, tails, eyes and movement. Learning these signals can make everyday interactions easier.",
        author: "PetCard Care Team",
        readTime: "6 min read",
        date: "August 24, 2026",
        image: "/images/zuzu2.png",
        intro:
            "Cats may not use words, but they communicate through an impressive combination of body posture, facial expression, movement and behaviour. Learning these signals is less about decoding one isolated gesture and more about looking at the whole picture.",
        sections: [
            {
                heading: "Start with the whole body",
                paragraphs: [
                    "A cat's tail, ears, eyes and posture can all provide information. One signal by itself can be ambiguous, so always consider the surrounding context.",
                    "For example, a moving tail does not automatically mean a cat is happy or angry. The speed, position and situation all matter."
                ],
            },
            {
                heading: "Relaxed body language",
                paragraphs: [
                    "A relaxed cat may sit or lie comfortably, hold its body loosely and show normal, calm movement. Slow blinking can also appear during relaxed social interaction.",
                    "A calm cat may still choose not to be touched, so relaxed body language should not be treated as an invitation every time."
                ],
            },
            {
                heading: "Signs of overstimulation",
                paragraphs: [
                    "Tail flicking, shifting posture, flattened ears or suddenly turning the head can be signs that a cat has had enough interaction.",
                    "Learning these early signals can help you stop or change an interaction before your cat becomes more uncomfortable."
                ],
            },
            {
                heading: "Fear and defensive behaviour",
                paragraphs: [
                    "A frightened cat may crouch, attempt to hide, hold its ears back or make its body appear smaller. A highly threatened cat may instead become defensive and try to create distance.",
                    "The safest response is usually to reduce pressure, give the cat space and allow them to move away."
                ],
            },
            {
                heading: "Why context matters",
                paragraphs: [
                    "Body language changes depending on the environment. A cat might display different behaviour during play, around unfamiliar people, near another animal or when visiting the veterinarian.",
                    "Keeping track of recurring triggers can help you understand your cat more accurately over time."
                ],
            },
        ],
        takeaways: [
            "Read several signals together rather than one movement.",
            "Give cats the option to move away from interaction.",
            "Watch for early signs of overstimulation.",
            "Context is essential when interpreting feline behaviour.",
        ],
    },

    {
        slug: "easy-homemade-meals-your-pet-will-love",
        category: "Nutrition",
        title: "Easy Homemade Meals Your Pet Will Love",
        excerpt:
            "Simple homemade food can be tempting, but safe preparation and nutritional balance should always come first.",
        author: "PetCard Care Team",
        readTime: "5 min read",
        date: "August 22, 2026",
        image: "/images/reward/coco.png",
        intro:
            "Homemade meals can feel like a wonderful way to show your pet some extra love. The important part is understanding that a tasty meal and a nutritionally complete diet are not always the same thing. For regular feeding, nutritional balance should take priority over novelty.",
        sections: [
            {
                heading: "Keep ingredients simple",
                paragraphs: [
                    "If you are preparing a treat or occasional homemade meal, simple ingredients make it easier to understand exactly what your pet is eating.",
                    "Avoid heavily seasoned foods and ingredients that are known to be unsafe for pets."
                ],
            },
            {
                heading: "Protein should not be the only consideration",
                paragraphs: [
                    "A balanced pet diet includes more than a single protein source. Depending on the species, age and health needs of your pet, nutritional requirements can be very different.",
                    "That is why homemade food intended to replace a regular diet should be planned with veterinary or qualified nutritional guidance."
                ],
            },
            {
                heading: "Avoid risky ingredients",
                paragraphs: [
                    "Ingredients that may be harmless to people can be dangerous for pets. Foods containing excessive salt, certain seasonings, alcohol, chocolate or other unsafe ingredients should never be casually added to a pet meal.",
                    "When you are unsure about an ingredient, check with a veterinarian before feeding it."
                ],
            },
            {
                heading: "Think portion size",
                paragraphs: [
                    "Treats and extras should remain appropriate for your pet's overall daily intake. Large portions of rich food can also cause digestive upset in some animals.",
                    "Introduce unfamiliar foods gradually and pay attention to how your pet responds."
                ],
            },
            {
                heading: "The safest homemade meal is the informed one",
                paragraphs: [
                    "Cooking at home can be part of a healthy relationship with your pet when you understand what they need nutritionally.",
                    "For pets with medical conditions, allergies, weight concerns or special dietary requirements, professional guidance becomes especially important."
                ],
            },
        ],
        takeaways: [
            "Homemade food should not automatically replace a complete pet diet.",
            "Keep ingredients simple and avoid unsafe seasonings.",
            "Portion size matters.",
            "Special dietary needs should be discussed with a veterinarian.",
        ],
        note:
            "This article is general educational content and is not a substitute for veterinary or professional nutritional advice.",
    },

    {
        slug: "fun-indoor-games-to-keep-pets-active-at-home",
        category: "Lifestyle",
        title: "Fun Indoor Games to Keep Pets Active at Home",
        excerpt:
            "Rainy day? No problem. A few simple indoor games can provide movement, stimulation and quality time together.",
        author: "PetCard Care Team",
        readTime: "4 min read",
        date: "August 20, 2026",
        image: "/images/coco2.png",
        intro:
            "Sometimes weather, schedules or living arrangements make outdoor activity more difficult. Indoor play cannot replace every form of exercise, but it can provide useful physical movement and mental stimulation when outdoor time is limited.",
        sections: [
            {
                heading: "Create a simple treasure hunt",
                paragraphs: [
                    "Hide a few safe treats or favourite toys around an appropriate area and encourage your pet to find them.",
                    "Start with easy locations and gradually make the game more interesting as your pet understands the idea."
                ],
            },
            {
                heading: "Try short training games",
                paragraphs: [
                    "Training is an excellent indoor activity because it engages your pet mentally while reinforcing useful behaviours.",
                    "Keep sessions short, positive and appropriate for your pet's age and ability."
                ],
            },
            {
                heading: "Use interactive toys",
                paragraphs: [
                    "Puzzle toys and food-dispensing toys can turn part of a meal or treat into a problem-solving activity.",
                    "Choose toys that are suitable for your pet and supervise new toys until you know how they use them."
                ],
            },
            {
                heading: "Build a simple obstacle course",
                paragraphs: [
                    "Pillows, low cushions and safe household objects can be arranged into a simple movement course when appropriate.",
                    "The goal should be exploration rather than challenging jumps or movements that could cause injury."
                ],
            },
            {
                heading: "Finish with calm time",
                paragraphs: [
                    "Good play sessions do not always need to end with more activity. After a game, give your pet an opportunity to drink, settle down and rest.",
                    "A healthy routine balances stimulation with recovery."
                ],
            },
        ],
        takeaways: [
            "Indoor play can support both physical and mental activity.",
            "Short training games are easy to fit into busy days.",
            "Choose safe toys and supervise unfamiliar activities.",
            "Always balance play with rest and recovery.",
        ],
    },

    {
        slug: "a-bond-like-no-other-milos-forever-home",
        category: "Stories",
        title: "A Bond Like No Other: Milo's Forever Home",
        excerpt:
            "A heartwarming story about trust, patience and the quiet moments that turn a rescue into a forever family.",
        author: "PetCard Journal",
        readTime: "3 min read",
        date: "August 18, 2026",
        image: "/images/about/dog.png",
        intro:
            "Some pet stories begin with excitement. Others begin with uncertainty. Milo's story began with a little bit of both. When he first arrived at his new home, he did not immediately understand that this was the place where he could finally stay.",
        sections: [
            {
                heading: "The first few days",
                paragraphs: [
                    "Milo spent much of his first few days quietly observing. Every sound was new, every room was unfamiliar and every person was still a stranger.",
                    "His new family quickly learned that building trust would not happen overnight."
                ],
            },
            {
                heading: "Trust grew through routine",
                paragraphs: [
                    "Meals arrived at predictable times. Walks slowly became familiar. A favourite sleeping spot appeared. The family focused on consistency rather than trying to force affection.",
                    "Little by little, Milo began to understand that the people around him were staying."
                ],
            },
            {
                heading: "The moment everything changed",
                paragraphs: [
                    "One evening, Milo walked over, placed his head beside his guardian and stayed there. It was a small moment, but for the family it felt enormous.",
                    "Trust had arrived quietly, without a dramatic announcement."
                ],
            },
            {
                heading: "A forever home is built every day",
                paragraphs: [
                    "A forever home is not simply an address. It is a collection of ordinary moments: feeding time, a walk around the neighbourhood, a toy left beside the bed and someone waiting at the door.",
                    "For Milo, those moments became proof that he had finally found his people."
                ],
            },
        ],
        takeaways: [
            "Trust often grows through consistency rather than pressure.",
            "Small everyday routines can create a strong sense of security.",
            "Every pet adjusts at their own pace.",
            "The most meaningful moments are often the simplest ones.",
        ],
    },

    {
        slug: "vaccination-guide-what-every-pet-parent-should-know",
        category: "Health",
        title: "Vaccination Guide: What Every Pet Parent Should Know",
        excerpt:
            "Understanding vaccination records, schedules and follow-ups can make it easier to stay organised and prepared for your pet's healthcare.",
        author: "PetCard Care Team",
        readTime: "6 min read",
        date: "August 16, 2026",
        image: "/images/brand/dog.png",
        intro:
            "Vaccination is an important part of preventive pet healthcare, but the appropriate schedule is not identical for every animal. Species, age, location, lifestyle and individual health can all influence what a veterinarian recommends.",
        sections: [
            {
                heading: "Why vaccination records matter",
                paragraphs: [
                    "A vaccination record gives you a clear history of the care your pet has received. Keeping those records organised can make future appointments and travel-related requirements easier to manage.",
                    "A digital record can also be useful when another trusted guardian needs access to important information."
                ],
            },
            {
                heading: "Vaccination schedules are individual",
                paragraphs: [
                    "Puppies and kittens often have different vaccination needs from adult animals. Booster timing can also vary depending on the vaccine, local recommendations and individual circumstances.",
                    "Instead of relying on a generic internet schedule, use the plan provided by your veterinarian."
                ],
            },
            {
                heading: "Ask questions during every appointment",
                paragraphs: [
                    "Pet parents do not need to memorise every vaccine name. It is more useful to understand what your veterinarian recommends, when the next dose is due and what signs to monitor afterward.",
                    "Writing those details down immediately can reduce the chance of missing an important follow-up."
                ],
            },
            {
                heading: "Keep records easy to access",
                paragraphs: [
                    "Important information can become difficult to find when it is spread across paper documents, phone photos and messages.",
                    "Keeping vaccination dates, veterinary visits and related notes together can make everyday organisation much simpler."
                ],
            },
            {
                heading: "When should you contact your veterinarian?",
                paragraphs: [
                    "After any vaccination, follow the aftercare guidance provided by your veterinary team. If your pet shows concerning or unusual symptoms, contact your veterinarian promptly.",
                    "For urgent or severe symptoms, seek veterinary emergency care rather than relying on online information."
                ],
            },
        ],
        takeaways: [
            "Vaccination plans should come from your veterinarian.",
            "Keep vaccination dates and records organised.",
            "Ask about the next recommended dose before leaving an appointment.",
            "Seek professional help for concerning reactions or symptoms.",
        ],
        note:
            "Health information on this page is for general education only and does not replace advice from a qualified veterinarian.",
    },

    {
        slug: "5-positive-reinforcement-tips-that-actually-work",
        category: "Training",
        title: "5 Positive Reinforcement Tips That Actually Work",
        excerpt:
            "Build better habits with reward-based training that focuses on clarity, consistency, timing and trust.",
        author: "PetCard Care Team",
        readTime: "4 min read",
        date: "August 14, 2026",
        image: "/images/huchiko2.png",
        intro:
            "Positive reinforcement is based on rewarding behaviours you want your pet to repeat. The approach is simple, but effective training depends on timing, consistency and understanding what motivates your individual pet.",
        sections: [
            {
                heading: "1. Reward the behaviour you want",
                paragraphs: [
                    "Training becomes clearer when your pet can immediately connect a behaviour with a positive outcome.",
                    "Reward the behaviour you want to see repeated rather than waiting too long and expecting your pet to understand what earned the reward."
                ],
            },
            {
                heading: "2. Keep sessions short",
                paragraphs: [
                    "Long sessions can quickly become tiring or frustrating. A few minutes of focused training can be enough to reinforce a useful behaviour.",
                    "Several short sessions spread across the day are often easier to fit into ordinary life."
                ],
            },
            {
                heading: "3. Be consistent",
                paragraphs: [
                    "Pets learn faster when the people around them use the same cues and expectations.",
                    "If one person rewards a behaviour while another discourages it, the message becomes harder to understand."
                ],
            },
            {
                heading: "4. Reward more than food",
                paragraphs: [
                    "Treats are useful, but they are not the only possible reward. Depending on the pet, rewards can include praise, play, attention or access to something they enjoy.",
                    "Learning what your pet values gives you more flexibility during training."
                ],
            },
            {
                heading: "5. End on success",
                paragraphs: [
                    "Finishing a training session after a successful repetition can help keep the experience positive.",
                    "Training is a process. Celebrate progress rather than expecting a new behaviour to become perfect immediately."
                ],
            },
        ],
        takeaways: [
            "Reward desired behaviour quickly and clearly.",
            "Short sessions can be more effective than long ones.",
            "Everyone in the household should use consistent cues.",
            "Use rewards that genuinely motivate your pet.",
        ],
    },
];

const slugToBlog = new Map(
    blogs.map((blog) => [blog.slug, blog])
);

export function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const blog = slugToBlog.get(slug);

    if (!blog) {
        notFound();
    }

    const currentIndex = blogs.findIndex(
        (item) => item.slug === blog.slug
    );

    const relatedBlogs = blogs
        .filter((_, index) => index !== currentIndex)
        .slice(0, 3);

    return (
        <main className={styles.page}>
            {/* =====================================================
          HERO
          ===================================================== */}

            <section className={styles.hero}>
                <div className={styles.heroGlow} />

                <div className={styles.container}>
                    <Link
                        href="/blogs"
                        className={styles.backLink}
                    >
                        <ArrowLeft size={15} />
                        Back to Blogs
                    </Link>

                    <div className={styles.heroGrid}>
                        <div className={styles.heroContent}>
                            <div className={styles.category}>
                                <PawPrint
                                    size={13}
                                    fill="currentColor"
                                />
                                {blog.category}
                            </div>

                            <h1>{blog.title}</h1>

                            <p className={styles.excerpt}>
                                {blog.excerpt}
                            </p>

                            <div className={styles.meta}>
                                <div>
                                    <UserRound size={15} />
                                    <span>{blog.author}</span>
                                </div>

                                <div>
                                    <Clock3 size={15} />
                                    <span>{blog.readTime}</span>
                                </div>

                                <div>
                                    <CalendarDays size={15} />
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.heroImageWrap}>
                            <div className={styles.imageGlow} />

                            <div className={styles.heroImage}>
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                />
                            </div>

                            <div className={styles.imagePaw}>
                                <PawPrint
                                    size={25}
                                    fill="currentColor"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
          ARTICLE
          ===================================================== */}

            <section className={styles.articleSection}>
                <div className={styles.container}>
                    <div className={styles.articleLayout}>
                        <aside className={styles.articleSide}>
                            <div className={styles.sideCard}>
                                <span>PetCard Journal</span>

                                <strong>
                                    Read, learn & care better.
                                </strong>

                                <div className={styles.sideDivider} />

                                <a href="#article-end">
                                    Jump to Related Reads
                                    <ArrowRight size={14} />
                                </a>
                            </div>

                            <div className={styles.shareCard}>
                                <span>Share</span>

                                <a
                                    href={`mailto:?subject=${encodeURIComponent(
                                        blog.title
                                    )}&body=${encodeURIComponent(
                                        `${blog.excerpt}\n\nRead more: ${blog.slug}`
                                    )}`}
                                    className={styles.shareButton}
                                    aria-label="Share article by email"
                                >
                                    <Share2 size={17} />
                                </a>

                                <button
                                    type="button"
                                    aria-label="Save article"
                                    className={styles.saveButton}
                                >
                                    <Heart size={17} />
                                </button>
                            </div>
                        </aside>

                        <article className={styles.article}>
                            <p className={styles.articleIntro}>
                                {blog.intro}
                            </p>

                            <div className={styles.articleDivider} />

                            {blog.sections.map(
                                (section, index) => (
                                    <section
                                        className={styles.articleBlock}
                                        key={section.heading}
                                    >
                                        <div className={styles.blockNumber}>
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </div>

                                        <div>
                                            <h2>
                                                {section.heading}
                                            </h2>

                                            {section.paragraphs.map(
                                                (paragraph) => (
                                                    <p key={paragraph}>
                                                        {paragraph}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </section>
                                )
                            )}

                            <div
                                className={styles.takeawayCard}
                            >
                                <div className={styles.takeawayIcon}>
                                    <PawPrint
                                        size={22}
                                        fill="currentColor"
                                    />
                                </div>

                                <div>
                                    <span>
                                        Quick Takeaway
                                    </span>

                                    <h2>
                                        What to remember
                                    </h2>

                                    <div
                                        className={
                                            styles.takeawayList
                                        }
                                    >
                                        {blog.takeaways.map(
                                            (item) => (
                                                <div
                                                    key={item}
                                                >
                                                    <span>✓</span>
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {blog.note && (
                                <div className={styles.noteCard}>
                                    <strong>
                                        Important Note
                                    </strong>

                                    <p>
                                        {blog.note}
                                    </p>
                                </div>
                            )}

                            <div
                                className={styles.articleEnd}
                                id="article-end"
                            >
                                <div className={styles.endIcon}>
                                    <PawPrint
                                        size={22}
                                        fill="currentColor"
                                    />
                                </div>

                                <h2>
                                    Better care starts with
                                    small everyday choices.
                                </h2>

                                <p>
                                    Keep learning, keep noticing the
                                    little things and make your pet's
                                    everyday routine a little more
                                    thoughtful.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* =====================================================
          RELATED POSTS
          ===================================================== */}

            <section className={styles.relatedSection}>
                <div className={styles.container}>
                    <div className={styles.relatedHeader}>
                        <div>
                            <span>Keep Reading</span>

                            <h2>
                                More stories for{" "}
                                <strong>pet parents.</strong>
                            </h2>
                        </div>

                        <Link href="/blogs">
                            View All Articles
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className={styles.relatedGrid}>
                        {relatedBlogs.map((item) => (
                            <Link
                                href={`/blogs/${item.slug}`}
                                className={styles.relatedCard}
                                key={item.slug}
                            >
                                <div className={styles.relatedImage}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                    />

                                    <span>
                                        {item.category}
                                    </span>
                                </div>

                                <div className={styles.relatedBody}>
                                    <h3>{item.title}</h3>

                                    <p>
                                        {item.excerpt}
                                    </p>

                                    <div
                                        className={
                                            styles.relatedMeta
                                        }
                                    >
                                        <span>
                                            <Clock3 size={13} />
                                            {item.readTime}
                                        </span>

                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          NEWSLETTER
          ===================================================== */}

            <section className={styles.newsletterSection}>
                <div className={styles.container}>
                    <div className={styles.newsletter}>
                        <div className={styles.newsletterPaw}>
                            <PawPrint
                                size={70}
                                fill="currentColor"
                            />
                        </div>

                        <div className={styles.newsletterContent}>
                            <span>
                                <Mail size={13} />
                                PetCard Journal
                            </span>

                            <h2>
                                Pawsome updates,
                                straight to your inbox.
                            </h2>

                            <p>
                                Get practical pet-care tips,
                                thoughtful stories and helpful
                                ideas delivered without the noise.
                            </p>
                        </div>

                        <div className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                            />

                            <button type="button">
                                Subscribe
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}