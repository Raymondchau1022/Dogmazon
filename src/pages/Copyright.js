import React from 'react'
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import './Copyright.css'

const Copyright = () => {

    return (
        <div className='Copyright'>
            <NavigationBar/>
            <div className='Copyright-container'>
                <div id="Copyright" className='Copyright-Box'>
                    <div className='Copyright-Title'>Copyright</div>
                    <div className='Copyright-Content'>
                        2022 Dogmazon Limited, All Rights Reserved.
                    </div>
                </div>
                <div id="Privacy" className='Copyright-Box'>
                    <div className='Copyright-Title'>Privacy</div>
                    <div className='Copyright-Content'>
                    &emsp; 
                    You will not and will not assist or permit any third party to, pass information to Dogmazon that Dogmazon could use or recognize as personally identifiable information. You will have and abide by an appropriate Privacy Policy and will comply with all applicable laws, policies, and regulations relating to the collection of information from Users. You must post a Privacy Policy and that Privacy Policy must provide notice of Your use of cookies, identifiers for mobile devices or similar technology used to collect data. You must disclose the use of Dogmazon, and how it collects and processes data. This can be done by displaying a prominent link to the site "How Dogmazon uses data when you use our partners' sites or apps". You will use commercially reasonable efforts to ensure that a User is provided with clear and comprehensive information about, and consents to, the storing and accessing of cookies or other information on the User’s device where such activity occurs in connection with the Service and where providing such information and obtaining such consent is required by law.
                    <br/>
                    <br/>
                    &emsp;
                    You must not circumvent any privacy features (e.g., an opt-out) that are part of the Service. You will comply with all applicable Google Analytics policies located at www.Dogmazon.com (or such other URL as Dogmazon may provide) as modified from time to time (the "Dogmazon Policies").
                    <br/>
                    <br/>
                    &emsp;
                    If You use the Platform Home, Your use of the Platform Home is subject to the Platform Home Additional Terms (or as subsequently re-named) available at https://support.Dogmazon.com(or such other URL as Dogmazon may provide) as modified from time to time (the "Platform Home Terms").
                    </div>
                </div>
                <div id="Conditions-of-use" className='Copyright-Box'>
                    <div className='Copyright-Title'>Conditions-of-use</div>
                    <div className='Copyright-Content'>
                    &emsp;
                    These Terms and Conditions of Use (the "Terms of Use") apply to the Dogmazon website located at www.Dogmazon.com, and all associated sites linked to www.Dogmazon.com by Dogmazon, its subsidiaries and affiliates, including Dogmazon sites around the world (collectively, the "Site"). The Site is the property of Dogmazon Inc. ("Dogmazon") and its licensors. BY USING THE SITE, YOU AGREE TO THESE TERMS OF USE; IF YOU DO NOT AGREE, DO NOT USE THE SITE.
                    <br/>
                    <br/>
                    &emsp;
                    Dogmazonreserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time. It is your responsibility to check these Terms of Use periodically for changes. Your continued use of the Site following the posting of changes will mean that you accept and agree to the changes. As long as you comply with these Terms of Use, Dogmazon grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Site.
                    </div>
                </div>
                <div id="Legal" className='Copyright-Box'>
                    <div className='Copyright-Title'>Legal</div>
                    <div className='Copyright-Content'>
                    &emsp;
                    DOGMAZON DOES NOT PROMISE THAT THE SITE OR ANY CONTENT, SERVICE OR FEATURE OF THE SITE WILL BE ERROR-FREE OR UNINTERRUPTED, OR THAT ANY DEFECTS WILL BE CORRECTED, OR THAT YOUR USE OF THE SITE WILL PROVIDE SPECIFIC RESULTS. THE SITE AND ITS CONTENT ARE DELIVERED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS. ALL INFORMATION PROVIDED ON THE SITE IS SUBJECT TO CHANGE WITHOUT NOTICE. DOGMAZON CANNOT ENSURE THAT ANY FILES OR OTHER DATA YOU DOWNLOAD FROM THE SITE WILL BE FREE OF VIRUSES OR CONTAMINATION OR DESTRUCTIVE FEATURES. DOGMAZON DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. DOGMAZON DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS, OMISSIONS AND CONDUCT OF ANY THIRD PARTIES IN CONNECTION WITH OR RELATED TO YOUR USE OF THE SITE AND/OR ANY DOGMAZON SERVICES. YOU ASSUME TOTAL RESPONSIBILITY FOR YOUR USE OF THE SITE AND ANY LINKED SITES. YOUR SOLE REMEDY AGAINST DOGMAZON FOR DISSATISFACTION WITH THE SITE OR ANY CONTENT IS TO STOP USING THE SITE OR ANY SUCH CONTENT. THIS LIMITATION OF RELIEF IS A PART OF THE BARGAIN BETWEEN THE PARTIES.
                    <br/>
                    <br/>
                    &emsp;
                    The above disclaimer applies to any damages, liability or injuries caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction of or unauthorized access to, alteration of, or use, whether for breach of contract, tort, negligence or any other cause of action.
                    <br/>
                    <br/>
                    &emsp;
                    ogmazon reserves the right to do any of the following, at any time, without notice: (1) to modify, suspend or terminate operation of or access to the Site, or any portion of the Site, for any reason; (2) to modify or change the Site, or any portion of the Site, and any applicable policies or terms; and (3) to interrupt the operation of the Site, or any portion of the Site, as necessary to perform routine or non-routine maintenance, error correction, or other changes.
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        ) 

}

export default Copyright;