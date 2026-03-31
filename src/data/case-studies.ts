import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  // ── 1. Edge Case ──────────────────────────────────────────────────────────────
  {
    slug: "edge-case",
    title: "How I Make Use of Edge Case",
    bookColor: {
      spine: "#C0392B",
      cover: "#E74C3C",
      accent: "#FF8A80",
      pages: "#FFF5F5",
    },
    coverArt: "/images/case-studies/edge-case/cover.png",
    toc: [
      {
        section: "01",
        title: "The Problem with Normal",
        subsections: [
          { id: "why-edges-matter", title: "Why Edges Matter", page: 4 },
          {
            id: "invisible-assumptions",
            title: "The Cost of Invisible Assumptions",
            page: 8,
          },
          { id: "real-world-fallout", title: "Real-World Fallout", page: 14 },
        ],
      },
      {
        section: "02",
        title: "Finding the Edges",
        subsections: [
          {
            id: "mapping-the-extremes",
            title: "Mapping the Extremes",
            page: 22,
          },
          {
            id: "stress-testing-personas",
            title: "Stress-Testing Personas",
            page: 28,
          },
          {
            id: "data-as-detector",
            title: "Using Data as a Detector",
            page: 35,
          },
        ],
      },
      {
        section: "03",
        title: "Designing Through the Edge",
        subsections: [
          {
            id: "graceful-degradation",
            title: "Graceful Degradation",
            page: 44,
          },
          {
            id: "progressive-disclosure",
            title: "Progressive Disclosure",
            page: 50,
          },
          { id: "shipping-the-lesson", title: "Shipping the Lesson", page: 58 },
        ],
      },
    ],
    content: [
      {
        id: "why-edges-matter",
        heading: "Why Edges Matter",
        body: "Most design processes are optimized for the median user doing the expected thing. Happy-path thinking feels efficient — you ship faster, the demo looks great, and stakeholders nod along. But the median user is a statistical fiction. Real people arrive with unexpected data, unstable connections, accessibility needs, and workflows you never imagined.\n\nEdge cases are not exceptions to be deferred — they are signals about where your mental model diverges from reality. Every edge case you ignore is a user you are silently abandoning. The question is not whether edge cases exist, but how early you choose to look for them.",
        images: ["/images/case-studies/edge-case/why-edges.png"],
      },
      {
        id: "invisible-assumptions",
        heading: "The Cost of Invisible Assumptions",
        body: "Assumptions are load-bearing walls in any design. The dangerous ones are the ones you did not know you were making. A form that assumes a name fits in two fields. A dashboard that assumes a dataset will never be empty. An onboarding flow that assumes the user has a stable internet connection.\n\nI catalogued thirty-seven invisible assumptions in a single product during a single sprint. Not because the team was careless — they were excellent — but because assumptions are the ambient air of product work. You breathe them in without noticing until a user suffocates on one.",
      },
      {
        id: "real-world-fallout",
        heading: "Real-World Fallout",
        body: "The cost of unaddressed edge cases compounds over time. Early on, a missing empty state is a minor nuisance. Six months later, the same empty state — now encountered by enterprise customers during an onboarding demo — kills a deal. The design debt is financial debt with interest.\n\nThree examples from my own work: a status dashboard that showed misleading progress for zero-item queues; an AI assistant that responded confidently with hallucinated data when given malformed input; a filter system that silently excluded 12 % of records for users in certain timezones. Each was caught only when a user reported it.",
        images: ["/images/case-studies/edge-case/fallout.png"],
      },
      {
        id: "mapping-the-extremes",
        heading: "Mapping the Extremes",
        body: "I use a simple 2×2 to map edge cases: frequency (rare vs. common) against impact (low vs. high). Rare and high-impact cases are your priority — they will blindside you. Common and low-impact cases are your quality of life improvements.\n\nFor each feature, I write an 'extremes list': the smallest possible input, the largest possible input, the empty state, the error state, the timeout state, the concurrent-edit state. This list becomes the acceptance criteria that engineers use to verify the implementation.",
      },
      {
        id: "stress-testing-personas",
        heading: "Stress-Testing Personas",
        body: "Standard personas capture the center of the distribution. Stress-test personas live at the edges. I create three kinds: the power user who pushes every limit (1,000 items in a list, 47 active filters, custom keyboard shortcuts for everything); the novice user who misreads every label; and the adversarial user who pastes scripts into text fields and uploads 4 GB files.\n\nThese are not meant to replace primary personas — they are adversarial lenses applied on top. Running your flows through them takes ninety minutes and consistently surfaces issues that months of standard testing missed.",
      },
      {
        id: "data-as-detector",
        heading: "Using Data as a Detector",
        body: "Once a product is live, the data tells you where the edges are. Session recordings of users who churned within their first week are an encyclopedia of edge-case failures. Zero-result searches reveal vocabulary mismatches. Error logs time-stamped at 3 AM reveal timezone bugs.\n\nI built a personal practice of spending one hour per week in analytics, specifically hunting for anomalies. What is the 99th percentile session length? What queries return zero results most often? Which user segments have the highest error rates? This hour has consistently generated more actionable design insights than any usability study I have run.",
        images: ["/images/case-studies/edge-case/data-detector.png"],
      },
      {
        id: "graceful-degradation",
        heading: "Graceful Degradation",
        body: "Graceful degradation is the principle that a system should fail in the least harmful way possible. Applied to design, it means every state — loading, empty, error, partial — should be intentionally designed, not accidentally rendered.\n\nI treat each state as a first-class deliverable. The empty state is not the absence of content; it is an opportunity to orient, educate, or delight. The error state is not a dead end; it is a moment to repair trust. When I started designing these states first — before the happy path — my work became dramatically more robust.",
      },
      {
        id: "progressive-disclosure",
        heading: "Progressive Disclosure",
        body: "Not all edge cases can be eliminated — some must simply be surfaced at the right moment. Progressive disclosure is the technique of revealing complexity only when it is contextually relevant.\n\nFor the Abuse Mailbox product, power users needed access to raw MIME headers, DKIM validation details, and manual classification overrides. Surfacing these controls for all users would have paralyzed novices. Hiding them entirely would have frustrated experts. The solution: a single 'Advanced' toggle that expanded the record view inline, with a tooltip explaining why someone might want it.",
        images: ["/images/case-studies/edge-case/progressive-disclosure.png"],
      },
      {
        id: "shipping-the-lesson",
        heading: "Shipping the Lesson",
        body: "The meta-lesson of working with edge cases is that shipping is not the end of the design process — it is the beginning of the feedback loop that reveals the next generation of edges.\n\nI now build edge-case reviews into every sprint retrospective: what edge cases did we discover this sprint, which did we fix, which did we consciously defer, and what did we learn about our assumptions? This ritual turns edge cases from embarrassments into curriculum. The best teams I have worked on treat every edge case as a gift — evidence that the product is being used in ways interesting enough to break your mental model.",
      },
    ],
  },

  // ── 2. Visualize Data ─────────────────────────────────────────────────────────
  {
    slug: "visualize-data",
    title: "Data Visualization or Visualize Data?",
    bookColor: {
      spine: "#1A1A1A",
      cover: "#2C2C2C",
      accent: "#F0F0F0",
      pages: "#FAFAFA",
    },
    coverArt: "/images/case-studies/visualize-data/cover.png",
    toc: [
      {
        section: "01",
        title: "The Semantic Divide",
        subsections: [
          { id: "two-disciplines", title: "Two Disciplines, One Name", page: 4 },
          {
            id: "chart-first-trap",
            title: "The Chart-First Trap",
            page: 10,
          },
          { id: "data-first-trap", title: "The Data-First Trap", page: 16 },
        ],
      },
      {
        section: "02",
        title: "Designing with Data",
        subsections: [
          {
            id: "question-before-chart",
            title: "Question Before Chart",
            page: 24,
          },
          {
            id: "encoding-decisions",
            title: "Encoding Decisions",
            page: 30,
          },
          {
            id: "color-as-language",
            title: "Color as Language",
            page: 38,
          },
        ],
      },
      {
        section: "03",
        title: "From Dashboard to Insight",
        subsections: [
          {
            id: "signal-to-noise",
            title: "Signal-to-Noise Ratio",
            page: 48,
          },
          {
            id: "the-annotation-layer",
            title: "The Annotation Layer",
            page: 54,
          },
          {
            id: "living-dashboards",
            title: "Living Dashboards",
            page: 62,
          },
        ],
      },
    ],
    content: [
      {
        id: "two-disciplines",
        heading: "Two Disciplines, One Name",
        body: "Data visualization and visualizing data sound identical. They are not. Data visualization is a craft discipline: the systematic study of how visual encoding translates quantitative information into perception. Visualizing data is a workflow: the act of turning a dataset into a picture, often in service of a decision.\n\nThe distinction matters because most practitioners conflate them. They reach for a chart type before asking whether a chart is the right medium. They debate bar versus line before asking what question the visualization is supposed to answer. The result is technically correct charts that communicate nothing actionable.",
        images: ["/images/case-studies/visualize-data/two-disciplines.png"],
      },
      {
        id: "chart-first-trap",
        heading: "The Chart-First Trap",
        body: "The chart-first trap is seductive because we live in a world of templates. Every BI tool ships with a gallery of chart types. Every design system includes a charting library. The path of least resistance is to pick something that looks appropriate and populate it with data.\n\nI have seen this trap produce pie charts with fourteen slices, heat maps where the color scale was aesthetically chosen, and line charts comparing metrics with different units on the same axis. Each was defensible in isolation. Together they formed a dashboard that measured everything and communicated nothing.",
      },
      {
        id: "data-first-trap",
        heading: "The Data-First Trap",
        body: "The data-first trap is the opposite failure mode: so much reverence for the data that the human reader disappears entirely. The output looks rigorous — every data point plotted, every dimension encoded, every outlier preserved — but it requires a data scientist to interpret.\n\nI have been guilty of this myself. The generative data art series walks this line intentionally, trading interpretability for aesthetic honesty. But in a product context, a visualization that only a data scientist can read has failed its primary job: enabling a decision by a specific person in a specific context.",
        images: ["/images/case-studies/visualize-data/data-first.png"],
      },
      {
        id: "question-before-chart",
        heading: "Question Before Chart",
        body: "My practice starts with a single sentence: 'This visualization will help [person] decide [action] by showing [insight].' If I cannot complete that sentence before opening Figma, I am not ready to design.\n\nFor Signal, the threat-feed visualization had to help a security analyst decide whether to escalate a threat cluster by showing the rate of new detections over time within a category. That sentence ruled out a table (no trend visible), a pie chart (no temporal dimension), and a heat map (wrong dimensionality). It pointed directly to a sparkline-enhanced table with threshold annotations.",
      },
      {
        id: "encoding-decisions",
        heading: "Encoding Decisions",
        body: "Position, length, angle, area, color hue, color saturation, shape, and texture: these are the preattentive attributes available to a data visualization designer. They are not equal. Position and length are decoded with high accuracy and low effort. Angle and area introduce systematic perceptual errors. Color hue carries categorical meaning; color saturation carries ordinal meaning.\n\nEvery visualization is a sequence of encoding decisions. Documenting them — even in a brief annotation — forces clarity and gives future collaborators a rationale to critique rather than re-litigate from scratch.",
      },
      {
        id: "color-as-language",
        heading: "Color as Language",
        body: "Color is the most misused encoding channel in dashboard design. It is simultaneously the most powerful (immediately preattentive) and the most treacherous (cultural associations, accessibility constraints, semantic collisions).\n\nI follow three rules: one hue per categorical dimension; use the traffic-light palette (red/yellow/green) only for status, never for performance; and always test in grayscale before shipping. The grayscale test is brutally effective — if the hierarchy survives it, the color is reinforcing structure, not substituting for it.",
        images: ["/images/case-studies/visualize-data/color-language.png"],
      },
      {
        id: "signal-to-noise",
        heading: "Signal-to-Noise Ratio",
        body: "Edward Tufte's data-ink ratio is the classic formulation: maximize the proportion of ink dedicated to data, minimize chartjunk. In practice, I find signal-to-noise ratio a more useful mental model because it includes the cognitive cost of interpretation, not just the visual cost of decoration.\n\nEvery grid line, every axis label, every legend entry costs attention. The question is whether it returns more than it costs. Major grid lines on a bar chart return their cost. Minor grid lines rarely do. Drop shadows return nothing. Background gradients are negative-value decoration: they cost attention and corrupt color encoding simultaneously.",
      },
      {
        id: "the-annotation-layer",
        heading: "The Annotation Layer",
        body: "The annotation layer is the secret weapon of effective data visualization. It is the layer of text, arrows, and highlights that a journalist would add to a chart before publishing — the layer that transforms a technically accurate chart into a story.\n\nIn product dashboards, annotations take the form of threshold lines with labels ('Target: 95 %'), anomaly callouts ('Spike due to campaign launch'), and trend summaries ('Down 12 % from last week'). These annotations do not interpret the data for the user — they provide landmarks that let the user orient faster and notice deviations more reliably.",
        images: ["/images/case-studies/visualize-data/annotation-layer.png"],
      },
      {
        id: "living-dashboards",
        heading: "Living Dashboards",
        body: "A dashboard is not a deliverable — it is a hypothesis. You are betting that these particular metrics, encoded in these particular ways, will generate the insights your users need. That bet requires testing.\n\nI build dashboard reviews into the product calendar: thirty minutes per quarter with three to five power users, watching them use the dashboard while narrating their interpretation. Invariably, users have renamed the metrics in their heads, stopped looking at certain charts entirely, and developed workarounds for questions the dashboard cannot answer. These reviews are more valuable than any analytics instrumentation because they capture the meaning layer, not just the behavior layer.",
      },
    ],
  },

  // ── 3. Misuse Rate ────────────────────────────────────────────────────────────
  {
    slug: "misuse-rate",
    title: "Reducing an 90% Misuse Rate into Nearly Zero Errors",
    subtitle: "From 90% Misuse Rate to 0 Error",
    bookColor: {
      spine: "#1565C0",
      cover: "#1976D2",
      accent: "#82B1FF",
      pages: "#F0F4FF",
    },
    coverArt: "/images/case-studies/misuse-rate/cover.png",
    toc: [
      {
        section: "01",
        title: "Diagnosing the 90%",
        subsections: [
          { id: "discovery", title: "Discovery: The 90% Number", page: 4 },
          {
            id: "root-cause-analysis",
            title: "Root Cause Analysis",
            page: 10,
          },
          {
            id: "stakeholder-alignment",
            title: "Aligning Stakeholders on Severity",
            page: 18,
          },
        ],
      },
      {
        section: "02",
        title: "Redesigning for Correct Use",
        subsections: [
          {
            id: "mental-model-mapping",
            title: "Mapping the Mental Model Gap",
            page: 28,
          },
          {
            id: "constraint-over-instruction",
            title: "Constraint Over Instruction",
            page: 36,
          },
          {
            id: "feedback-loops",
            title: "Closing the Feedback Loop",
            page: 44,
          },
        ],
      },
      {
        section: "03",
        title: "The Result & the Lesson",
        subsections: [
          { id: "measuring-success", title: "Measuring Success", page: 54 },
          {
            id: "what-zero-costs",
            title: "What Getting to Zero Costs",
            page: 60,
          },
          {
            id: "transferable-framework",
            title: "A Transferable Framework",
            page: 68,
          },
        ],
      },
    ],
    content: [
      {
        id: "discovery",
        heading: "Discovery: The 90% Number",
        body: "Ninety percent. That was the misuse rate for a manual classification feature in the Abuse Mailbox product when I inherited the design. Nine out of ten analysts using the feature were applying the wrong classification label — not because they were careless, but because the interface made the wrong action feel correct.\n\nI discovered this number not from a usability study but from a data audit. A customer success manager flagged that classification-override data was being treated as reliable by the ML retraining pipeline, and that the pipeline's performance was degrading. We traced the degradation to the manual classifications. The UX problem had become an AI integrity problem.",
        images: ["/images/case-studies/misuse-rate/discovery.png"],
      },
      {
        id: "root-cause-analysis",
        heading: "Root Cause Analysis",
        body: "The root cause was a labeling mismatch between the system's taxonomy and the user's mental model. The system used technical ML categories: 'phishing', 'scam', 'brand_impersonation', 'benign'. Analysts understood these terms differently depending on their background — threat intelligence analysts and abuse-desk generalists had internalized completely different taxonomies from their previous tools.\n\nThe interface presented all four categories as equally prominent radio buttons with no contextual guidance. It offered no preview of what selecting each category would do downstream. And it allowed the action without confirmation, so there was no moment of friction that might prompt reconsideration.",
      },
      {
        id: "stakeholder-alignment",
        heading: "Aligning Stakeholders on Severity",
        body: "The first design challenge was not visual — it was political. Engineering had shipped the feature and considered it done. Product management had not prioritized a redesign. Customer success owned the customer relationships but not the roadmap.\n\nI prepared a ten-minute presentation connecting the 90% misuse rate to three quantifiable outcomes: ML model degradation (documented by data science), customer trust erosion (documented by CS), and potential churn risk on two enterprise accounts. Once the problem was reframed as a product quality issue with financial consequences, it moved from backlog to the next sprint.",
        images: ["/images/case-studies/misuse-rate/stakeholder.png"],
      },
      {
        id: "mental-model-mapping",
        heading: "Mapping the Mental Model Gap",
        body: "I ran five thirty-minute interviews with analysts, asking them to classify a set of ten threats aloud using the existing interface. Two patterns emerged immediately: analysts translated the system's category names into their own vocabulary before selecting (adding ~10 seconds of latency and ~30% error rate in the translation step), and analysts had no idea their classifications fed the ML model.\n\nThis second finding was critical. Users did not understand that their actions had permanent downstream consequences. They treated classification overrides like sticky notes — temporary opinions — rather than authoritative training signals.",
      },
      {
        id: "constraint-over-instruction",
        heading: "Constraint Over Instruction",
        body: "The tempting solution was documentation: add a tooltip, a help article, an onboarding video explaining the taxonomy. I have seen this solution deployed a hundred times and it rarely works. Users do not read tooltips in high-volume operational workflows. The cognitive cost of stopping to read is higher than the perceived cost of guessing.\n\nThe correct solution was constraint: make it harder to choose the wrong option than the right one. I redesigned the classification interaction as a three-step progressive disclosure: first confirm intent ('Are you overriding the AI classification?'), then select category with plain-language descriptions and examples, then confirm the downstream impact ('This will retrain the model for similar threats'). The three-step flow added four seconds to the action but reduced misclassifications from 90% to under 3%.",
        images: ["/images/case-studies/misuse-rate/constraint.png"],
      },
      {
        id: "feedback-loops",
        heading: "Closing the Feedback Loop",
        body: "Constraint alone was not sufficient. Analysts needed to see the consequence of their correct classifications to build intuition and motivation. I designed a 'contribution score' that appeared on each analyst's profile — a simple metric showing how many classifications they had made and what percentage had been confirmed by subsequent automated detections.\n\nThis turned a corrective interaction into a positive feedback loop. Analysts began treating classification accuracy as a professional benchmark. The team that had the highest accuracy score started documenting their classification criteria and sharing them with peers — emergent behavior that no stakeholder had anticipated.",
      },
      {
        id: "measuring-success",
        heading: "Measuring Success",
        body: "I defined success before shipping: misuse rate below 5%, measured over a 30-day window following rollout. Secondary metrics: time-per-classification (proxy for learnability), analyst NPS on the classification flow, and ML model performance on categories where manual overrides were common.\n\nAt 30 days: 2.8% misuse rate. At 90 days: 1.1%. Mean time-per-classification increased from 4 seconds to 8 seconds — expected given the three-step flow — but analyst NPS on the feature went from -12 to +34. The ML model performance improvement was visible within six weeks.",
        images: ["/images/case-studies/misuse-rate/results.png"],
      },
      {
        id: "what-zero-costs",
        heading: "What Getting to Zero Costs",
        body: "Near-zero error rates are not free. The four-second overhead per classification added roughly 90 minutes per analyst per month in a high-volume deployment. That cost is acceptable when the downstream consequence of misclassification is ML model corruption. It would not be acceptable in a lower-stakes context.\n\nThe lesson: error-prevention design must be proportional to error cost. A misfiled support ticket warrants a one-click undo. A misclassification that degrades an AI model warrants three confirmation steps. Before adding friction, calculate the cost of the error you are preventing and compare it to the cost of the friction you are adding — in aggregate, across all users, over a year.",
      },
      {
        id: "transferable-framework",
        heading: "A Transferable Framework",
        body: "The pattern that generalized from this project: Detect → Diagnose → Constrain → Confirm → Reward. Detect the misuse through data. Diagnose the root cause through interviews. Constrain the wrong action more than the right one. Confirm the downstream consequence at the moment of action. Reward correct use with visible feedback.\n\nI have applied this framework to a form that was generating malformed API requests, a filter system that was producing misleading exports, and an onboarding flow that was leading new users to a dead-end state. It works because it treats misuse as a design problem, not a user problem.",
        images: ["/images/case-studies/misuse-rate/framework.png"],
      },
    ],
  },

  // ── 4. Right Problem ──────────────────────────────────────────────────────────
  {
    slug: "right-problem",
    title: "Solve the Right Problem",
    bookColor: {
      spine: "#F57F17",
      cover: "#FBC02D",
      accent: "#FF80AB",
      pages: "#FFFDE7",
    },
    coverArt: "/images/case-studies/right-problem/cover.png",
    toc: [
      {
        section: "01",
        title: "The Problem with Problem Statements",
        subsections: [
          {
            id: "solution-shaped-problems",
            title: "Solution-Shaped Problems",
            page: 4,
          },
          {
            id: "stakeholder-translation",
            title: "Stakeholder Translation Errors",
            page: 10,
          },
          { id: "reframing-tools", title: "Reframing Tools", page: 16 },
        ],
      },
      {
        section: "02",
        title: "Research as Problem-Finding",
        subsections: [
          {
            id: "jobs-to-be-done",
            title: "Jobs to Be Done in Practice",
            page: 26,
          },
          {
            id: "five-whys-design",
            title: "Five Whys for Design",
            page: 32,
          },
          {
            id: "problem-laddering",
            title: "Problem Laddering",
            page: 40,
          },
        ],
      },
      {
        section: "03",
        title: "Committing and Shipping",
        subsections: [
          { id: "problem-scoping", title: "Scoping the Right Problem", page: 50 },
          {
            id: "defending-the-reframe",
            title: "Defending the Reframe",
            page: 56,
          },
          {
            id: "when-to-pivot",
            title: "When to Pivot Mid-Sprint",
            page: 64,
          },
        ],
      },
    ],
    content: [
      {
        id: "solution-shaped-problems",
        heading: "Solution-Shaped Problems",
        body: "The most common design mistake is not a bad solution — it is a solution to the wrong problem. And the most common reason for solving the wrong problem is that the problem statement was written in the shape of a solution.\n\n'Users need a way to export their data as CSV' is a solution-shaped problem. The underlying problem might be 'users cannot share their analysis with colleagues who do not have product access'. CSV export is one solution. In-app sharing with view-only permissions is another. A Slack integration is another. If you build CSV export without asking why users want it, you might ship a feature that solves the stated request and misses the actual need entirely.",
        images: ["/images/case-studies/right-problem/solution-shaped.png"],
      },
      {
        id: "stakeholder-translation",
        heading: "Stakeholder Translation Errors",
        body: "Between a user's actual experience and a design brief, the problem passes through at least three translation layers: the user's self-report, the customer success team's interpretation, and the product manager's prioritization framing. Each layer introduces distortion.\n\nUsers describe symptoms, not root causes. Customer success teams filter through the lens of customer relationships. Product managers frame through the lens of roadmap feasibility. By the time the problem reaches a designer's desk, it may bear little resemblance to the experience that generated it. The designer's job includes auditing those translations.",
      },
      {
        id: "reframing-tools",
        heading: "Reframing Tools",
        body: "Three tools I use consistently to reframe problem statements: How Might We (remove the implicit solution from the framing), Job Story (focus on the motivation and context, not the feature), and Abstraction Laddering (move the problem up and down a hierarchy of abstraction to find the right level to solve at).\n\nAbstraction laddering is particularly powerful. A problem at the bottom of the ladder ('the button is hard to find') has different solutions than the same problem one level up ('users cannot complete the primary action') or two levels up ('users do not understand the product value proposition'). The correct level to solve at depends on what you can change, what has the most leverage, and what your organization can actually ship.",
        images: ["/images/case-studies/right-problem/reframing.png"],
      },
      {
        id: "jobs-to-be-done",
        heading: "Jobs to Be Done in Practice",
        body: "Jobs to Be Done (JTBD) is the most useful lens I know for identifying the right problem. The core insight: people do not buy products, they hire them to do a job in their life. Understanding the job — the progress the user is trying to make, in their specific context, with their specific anxieties and motivations — reveals what the product actually needs to do.\n\nIn practice, I run JTBD interviews by asking about the last time someone hired (or fired) a competing solution. The story they tell about the switching moment is dense with insight about what the job actually is, what the existing solutions fail at, and what 'done' looks like to them.",
      },
      {
        id: "five-whys-design",
        heading: "Five Whys for Design",
        body: "The Five Whys technique from manufacturing quality control translates directly to UX problem diagnosis. Starting from a symptom ('users are abandoning the onboarding flow at step 3'), ask why five times. Each answer becomes the subject of the next why.\n\nTypically, the first two answers are superficial ('the step is confusing'). By the fourth or fifth answer, you are at a root cause that was not obvious from the symptom: a mismatch between what the product asks users to have ready and what they actually have at hand during onboarding. Solving that root cause — redesigning the flow to accommodate users who do not have the required information yet — produces a more durable improvement than any surface-level simplification.",
        images: ["/images/case-studies/right-problem/five-whys.png"],
      },
      {
        id: "problem-laddering",
        heading: "Problem Laddering",
        body: "Problem laddering is the structured practice of moving between levels of abstraction to find where a problem is most productively solved. I learned to do it explicitly after a project where I spent three weeks perfecting a filter interface that turned out to be solving a problem that should have been solved in the data model.\n\nThe ladder has rungs: interaction (how does the user accomplish the action?), flow (what sequence of actions is required?), feature (what capability does the user need?), product (what job does the product do?), system (what is the broader context the product operates in?). Placing a problem on the ladder before proposing solutions prevents gold-plating at the wrong level.",
      },
      {
        id: "problem-scoping",
        heading: "Scoping the Right Problem",
        body: "Once you have found the right problem, you must scope it to something shippable. The right problem at the wrong scope is not actionable. 'Users do not understand the value of the product' is a real problem at a real level of abstraction, but it is not a design sprint input — it is a positioning and strategy conversation.\n\nI scope problems using two constraints: what can be shipped in the available time, and what will produce a measurable signal. A scoped problem statement sounds like: 'Within this sprint, we will improve [specific metric] for [specific user segment] by addressing [specific root cause] at [specific touchpoint].' The brackets are fill-in-the-blank slots that force specificity.",
        images: ["/images/case-studies/right-problem/scoping.png"],
      },
      {
        id: "defending-the-reframe",
        heading: "Defending the Reframe",
        body: "Reframing a problem is a political act. Someone wrote the original brief. Someone prioritized the solution-shaped problem on the roadmap. Telling them the problem is different risks being perceived as blocking progress or undermining authority.\n\nI have learned to defend reframes with evidence, not assertion. Not 'the problem statement is wrong' but 'here is what I heard in user research, here is what the data shows, here is what I believe the actual job is — and here is why solving for that will produce better outcomes for the metrics we share.' This positions the reframe as additional information rather than challenge.",
      },
      {
        id: "when-to-pivot",
        heading: "When to Pivot Mid-Sprint",
        body: "Sometimes you discover mid-sprint that you are solving the wrong problem. This is not failure — it is the research doing its job. The question is what to do about it.\n\nMy rule: if the right problem is adjacent to the scoped problem and can be addressed within the sprint's remaining time, pivot. If the right problem is significantly different, do not try to solve it in the current sprint — complete the scoped deliverable, document the finding clearly, and advocate for a dedicated sprint on the right problem. Half-solving the wrong problem and half-solving the right problem produces a whole lot of nothing.",
        images: ["/images/case-studies/right-problem/pivot.png"],
      },
    ],
  },
];

// ── Helper function ─────────────────────────────────────────────────────────────

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
