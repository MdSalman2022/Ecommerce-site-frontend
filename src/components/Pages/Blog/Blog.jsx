import React from 'react';

const Blog = () => {


    //Question/Answers
    return (
        <div className='container mt-10 mx-auto px-10  min-h-screen '>
            <h1 className="text-4xl text-center font-bold">Question / Answers</h1>
            <div className="collapse collapse-arrow  rounded-box my-5">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    1. What are the different ways to manage a state in a React application?
                </div>
                <div className="collapse-content bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    <p>In React apps, there are five ways to handle the state.
                        <li>URL</li>
                        <li>Web Storage</li>
                        <li>Local State</li>
                        <li>Lifted State</li>
                        <li>Derived State</li>
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow  rounded-box my-5">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    2.How does prototypical inheritance work?
                </div>
                <div className="collapse-content bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]]
                        of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow  rounded-box my-5">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    3. What is a unit test? Why should we write unit tests?
                </div>
                <div className="collapse-content bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    <p>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.
                        The main objective of unit testing is to isolate written code to test and determine if it works as intended.
                        Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow  rounded-box my-5">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    4. React vs. Angular vs. Vue?
                </div>
                <div className="collapse-content bg-neutral text-neutral-content peer-checked:bg-info peer-checked:text-info-content">
                    <p>
                        <p><span className="font-bold">React: </span> React is considered a UI library. They define themselves as: “A JavaScript library for building user interfaces” Facebook developers are behind the development and maintenance of this library. And, in this case, most of Facebook’s products are made with React.</p>

                        <p><span className="font-bold">Angular: </span>Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as: “The modern web developer’s platform” It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube.</p>

                        <p><span className="font-bold">Vue: </span> Vue.js is, according to its site:“A progressive JavaScript framework” Vue.js is developed and led by Evan You, but also it counts on a huge open-source .</p>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog;