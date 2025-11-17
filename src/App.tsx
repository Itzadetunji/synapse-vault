/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithMouseEvents: <explanation> */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Search } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type HoverType = "libraries" | "plugins" | "icons" | undefined;
export const App = () => {
	const [currentHover, setCurrentHover] = useState<HoverType>("libraries");
	console.log(currentHover);

	const [isUserHovering, setIsUserHovering] = useState(false);
	const intervalRef = useRef<null>(null);

	useEffect(() => {
		const hoverOptions: HoverType[] = ["libraries", "plugins", "icons"];
		let currentIndex = hoverOptions.indexOf(currentHover);

		intervalRef.current = setInterval(() => {
			if (!isUserHovering) {
				currentIndex = (currentIndex + 1) % hoverOptions.length;
				setCurrentHover(hoverOptions[currentIndex]);
			}
		}, 3000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isUserHovering]);

	const handleMouseEnter = (hover: HoverType) => {
		setIsUserHovering(true);
		setCurrentHover(hover);
	};

	const handleMouseLeave = () => {
		setIsUserHovering(false);
	};

	return (
		<main className="h-dvh flex flex-col items-center justify-center bg-[#272727] relative">
			<LibrariesIcons currentHover={currentHover} />
			<PluginsIcons currentHover={currentHover} />
			<SetsIcons currentHover={currentHover} />
			<div className="flex flex-col items-center relative gap-10">
				<p className="text-center text-2xl font-semibold text-white relative">
					Discover community-made{" "}
					<span
						className={`transition-colors duration-200 ${
							currentHover === "libraries" ? "text-sky-300" : "text-[#FFFFFFB3]"
						}`}
						onMouseEnter={() => handleMouseEnter("libraries")}
						onMouseLeave={handleMouseLeave}
					>
						libraries
					</span>
					, <br />
					<span
						className={`transition-colors duration-200 ${
							currentHover === "plugins" ? "text-sky-300" : "text-[#FFFFFFB3]"
						}`}
						onMouseEnter={() => handleMouseEnter("plugins")}
						onMouseLeave={handleMouseLeave}
					>
						plugins
					</span>
					,{" "}
					<span
						className={`transition-colors duration-200 ${
							currentHover === "icons" ? "text-sky-300" : "text-[#FFFFFFB3]"
						}`}
						onMouseEnter={() => handleMouseEnter("icons")}
						onMouseLeave={handleMouseLeave}
					>
						icon sets
					</span>
					, and more
				</p>
				<div className="bg-[rgb(49,49,49)] h-10 p-1.5 flex items-center rounded-full w-80 focus-within:outline-2 focus-within:outline-blue-500">
					<i className="px-2">
						<Search className="size-4 text-white" />
					</i>
					<input
						type="text"
						placeholder="Search for resources like 'portfolio'"
						className="text-xs text-white flex-1 font-light outline-none bg-transparent"
					/>
				</div>
			</div>

			<a
				href="https://x.com/itzadetunji1"
				className="fixed bottom-4 text-white text-xs"
			>
				By <span className="underline">Adetunji Adeyinka</span>
			</a>
		</main>
	);
};

const LibrariesIcons = (props: { currentHover: HoverType }) => {
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	useGSAP(() => {
		gsap.set("#l-icon-1", { x: -50, y: 10, rotate: -5, scale: 0, opacity: 0 });
		gsap.set("#l-icon-2", { x: 10, y: -10, rotate: 10, scale: 0, opacity: 0 });
		gsap.set("#l-icon-3", { x: -20, y: -10, rotate: 0, scale: 0, opacity: 0 });

		gsap.set("#l-icon-4", { x: 0, y: 12, rotate: -5, scale: 0, opacity: 0 });
		gsap.set("#l-icon-5", { x: 60, y: -30, rotate: 10, scale: 0, opacity: 0 });
		gsap.set("#l-icon-6", { x: -5, y: -15, rotate: 0, scale: 0, opacity: 0 });

		timelineRef.current = gsap.timeline({
			paused: true,
			id: "librariesTimeline",
			delay: 0.2,
		});

		timelineRef.current
			.to("#l-icon-1", {
				x: -60,
				y: 12,
				scale: 1,
				opacity: 1,
				ease: "elastic.inOut",
				duration: 0.4,
			})
			.to(
				"#l-icon-2",
				{
					x: +5,
					y: -20,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#l-icon-3",
				{
					x: -50,
					y: -5,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#l-icon-4",
				{
					x: 10,
					y: 12,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#l-icon-5",
				{
					x: 70,
					y: -35,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#l-icon-6",
				{
					x: 25,
					y: -15,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			);

		return () => {
			timelineRef.current?.kill();
		};
	}, []);

	useLayoutEffect(() => {
		if (timelineRef.current) {
			if (props.currentHover === "libraries") {
				timelineRef.current.timeScale(1).play();
			} else {
				timelineRef.current.timeScale(1).reverse();
			}
		}
	}, [props.currentHover]);

	return (
		<div className="flex absolute w-full max-w-xl justify-between overflow-visible -mt-15">
			<div>
				<img
					src="/libraries/settings.svg"
					alt=""
					id="l-icon-1"
				/>
				<img
					src="/libraries/pallete.svg"
					alt=""
					id="l-icon-2"
				/>
				<img
					src="/libraries/bars.svg"
					alt=""
					id="l-icon-3"
				/>
			</div>
			<div>
				<img
					src="/libraries/font.svg"
					alt=""
					id="l-icon-4"
				/>
				<img
					src="/libraries/book.svg"
					alt=""
					id="l-icon-5"
				/>
				<img
					src="/libraries/bars-2.svg"
					alt=""
					id="l-icon-6"
				/>
			</div>
		</div>
	);
};

const PluginsIcons = (props: { currentHover: HoverType }) => {
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	useGSAP(() => {
		gsap.set("#p-icon-1", {
			x: -50,
			y: -10,
			rotate: -15,
			scale: 0,
			opacity: 0,
		});
		gsap.set("#p-icon-2", { x: 20, y: -45, rotate: 20, scale: 0, opacity: 0 });
		gsap.set("#p-icon-3", { x: 5, y: -35, rotate: -7.5, scale: 0, opacity: 0 });

		gsap.set("#p-icon-4", {
			x: -30,
			y: -15,
			rotate: -25,
			scale: 0,
			opacity: 0,
		});
		gsap.set("#p-icon-5", { x: 35, y: -40, rotate: 15, scale: 0, opacity: 0 });
		gsap.set("#p-icon-6", { x: -10, y: -35, rotate: 10, scale: 0, opacity: 0 });

		timelineRef.current = gsap.timeline({
			paused: true,
			id: "pluginsTimeline",
			delay: 0.2,
		});

		timelineRef.current
			.to("#p-icon-1", {
				x: -60,
				y: -20,
				scale: 1,
				opacity: 1,
				ease: "elastic.inOut",
				duration: 0.4,
			})
			.to(
				"#p-icon-2",
				{
					x: 10,
					y: -55,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#p-icon-3",
				{
					x: -5,
					y: -35,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#p-icon-4",
				{
					x: -20,
					y: -20,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#p-icon-5",
				{
					x: 45,
					y: -45,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#p-icon-6",
				{
					x: 0,
					y: -35,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			);

		return () => {
			timelineRef.current?.kill();
		};
	}, []);

	useLayoutEffect(() => {
		if (timelineRef.current) {
			if (props.currentHover === "plugins") {
				timelineRef.current.timeScale(1).play();
			} else {
				timelineRef.current.timeScale(1).reverse();
			}
		}
	}, [props.currentHover]);

	return (
		<div className="flex absolute w-full max-w-xl justify-between overflow-visible -mt-5">
			<div>
				<img
					src="https://static.figma.com/uploads/65c3bfafc5758245135ea68c46bf8649e08fc682"
					alt=""
					className="rounded-md size-8"
					id="p-icon-1"
				/>

				<img
					src="https://static.figma.com/uploads/ebe89d33f7040c60d83a01887800a522babf7de7"
					alt=""
					className="rounded-md size-8"
					id="p-icon-2"
				/>
				<img
					src="https://static.figma.com/uploads/4c694b59552bdaf728d6bbad5c5603c08e768dde"
					alt=""
					className="rounded-md size-8"
					id="p-icon-3"
				/>
			</div>
			<div>
				<img
					src="https://static.figma.com/uploads/2a50b4b29af5a21bde6c7b4ef8cdfd97a2b16a39"
					alt=""
					className="rounded-md size-8"
					id="p-icon-4"
				/>
				<img
					src="https://static.figma.com/uploads/0d28516cbda0bfcf87b214c919c6ed52f3358efb"
					alt=""
					className="rounded-md size-8"
					id="p-icon-5"
				/>

				<img
					src="https://static.figma.com/uploads/34cf09b757fec1181abee8d8ece8a06ee0383408"
					alt=""
					className="rounded-md size-8"
					id="p-icon-6"
				/>
			</div>
		</div>
	);
};

const SetsIcons = (props: { currentHover: HoverType }) => {
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	useGSAP(() => {
		gsap.set("#s-icon-1", { x: -45, y: 5, rotate: 25, scale: 0, opacity: 0 });
		gsap.set("#s-icon-2", {
			x: 0,
			y: -50,
			rotate: -15,
			scale: 0,
			opacity: 0,
		});
		gsap.set("#s-icon-3", { x: -55, y: 0, rotate: -15, scale: 0, opacity: 0 });
		gsap.set("#s-icon-4", { x: 15, y: -15, rotate: 15, scale: 0, opacity: 0 });

		gsap.set("#s-icon-5", { x: -25, y: -20, rotate: 15, scale: 0, opacity: 0 });
		gsap.set("#s-icon-6", { x: 40, y: -35, rotate: 30, scale: 0, opacity: 0 });
		gsap.set("#s-icon-7", { x: -15, y: 10, rotate: 30, scale: 0, opacity: 0 });
		gsap.set("#s-icon-8", { x: 50, y: 0, rotate: 5, scale: 0, opacity: 0 });

		timelineRef.current = gsap.timeline({
			paused: true,
			id: "pluginsTimeline",
			delay: 0.2,
		});

		timelineRef.current
			.to("#s-icon-1", {
				x: -50,
				y: 5,
				scale: 1,
				opacity: 1,
				ease: "elastic.inOut",
				duration: 0.4,
			})
			.to(
				"#s-icon-2",
				{
					x: 5,
					y: -55,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#s-icon-3",
				{
					x: -60,
					y: -5,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#s-icon-4",
				{
					x: 20,
					y: -20,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#s-icon-5",
				{
					x: -30,
					y: -25,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#s-icon-6",
				{
					x: 45,
					y: -40,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#s-icon-7",
				{
					x: -20,
					y: 15,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			)
			.to(
				"#s-icon-8",
				{
					x: 55,
					y: -5,
					scale: 1,
					opacity: 1,
					ease: "elastic.inOut",
					duration: 0.4,
				},
				0
			);

		return () => {
			timelineRef.current?.kill();
		};
	}, []);

	useLayoutEffect(() => {
		if (timelineRef.current) {
			if (props.currentHover === "icons") {
				timelineRef.current.timeScale(1).play();
			} else {
				timelineRef.current.timeScale(1).reverse();
			}
		}
	}, [props.currentHover]);

	return (
		<div className="flex absolute w-full max-w-xl justify-between overflow-visible">
			<div>
				<img
					src="/sets/star.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-1"
				/>
				<img
					src="/sets/profile.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-2"
				/>
				<img
					src="/sets/house.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-3"
				/>
				<img
					src="/sets/at.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-4"
				/>
			</div>
			<div>
				<img
					src="/sets/smile.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-5"
				/>
				<img
					src="/sets/message.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-6"
				/>
				<img
					src="/sets/settings.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-7"
				/>
				<img
					src="/sets/bookmark.svg"
					alt=""
					className="rounded-md size-8"
					id="s-icon-8"
				/>
			</div>
		</div>
	);
};
