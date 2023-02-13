import React from "react";
import Head from "next/head";

export const HeadFacade = ({title}:{title:string}) => {
	return <Head>
		<title>{title} - Artbox</title>
		<meta property="og:title" content={`${title}  - Artbox`} key="title" />
	</Head>
}