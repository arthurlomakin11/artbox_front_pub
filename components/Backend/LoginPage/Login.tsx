import React, {useState} from "react";
import {Register} from "./Register";
import {SignIn} from "./SignIn";
import tabStyles from "./styles/TabComponent.module.css";
import greetingStyles from "./styles/Greeting.module.css";

export const Login = () => {
	return <TabsComponent initialTabNumber={1}>
		<Register/>
		<SignIn/>
	</TabsComponent>
}

const TabsComponent = (props:any) => {
	const [currentTabNumber, setCurrentTabNumber] = useState(props.initialTabNumber)

	let tabs = props.children.map((element:any, index:any) => {
		return {
			body: element,
			tabNumber: index
		}
	})

	return (<div className={tabStyles.TabComponent}>
		<Greeting/>
		<div className={tabStyles.Tabs}>{
			tabs.map((tab:any) => {
				return (<button key={tab.tabNumber} className={
					tab.tabNumber == currentTabNumber ?
						`${tabStyles.Tabs_Button} ${tabStyles.Tabs_ButtonActive}`
						: tabStyles.Tabs_Button
				} onClick={() => {setCurrentTabNumber(tab.tabNumber)}}>{tab.tabNumber}</button>)
			})
		}</div>
		<div className={tabStyles.Body}>
			{
				tabs.find((el:any) => el.tabNumber == currentTabNumber).body
			}
		</div>
	</div>)
}

const Greeting = () => {
	return <div className={greetingStyles.Greeting}>Привіт, друже!</div>
}