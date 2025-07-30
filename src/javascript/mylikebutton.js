/*
   _      _      _      _      _      _      _      _      _      _      _      _   
 _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_ 
(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)
 (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_) 
   _                                                                            _   
 _( )_                                                                        _( )_ 
(_ o _)                     _ _ _          _           _   _                 (_ o _)
 (_,_)                     | (_) |        | |         | | | |                 (_,_) 
   _      _ __ ___  _   _  | |_| | _____  | |__  _   _| |_| |_ ___  _ __        _   
 _( )_   | '_ ` _ \| | | | | | | |/ / _ \ | '_ \| | | | __| __/ _ \| '_ \     _( )_ 
(_ o _)  | | | | | | |_| | | | |   <  __/ | |_) | |_| | |_| || (_) | | | |   (_ o _)
 (_,_)   |_| |_| |_|\__, | |_|_|_|\_\___| |_.__/ \__,_|\__|\__\___/|_| |_|    (_,_) 
   _                 __/ |                                                      _   
 _( )_              |___/                                                     _( )_ 
(_ o _)                                                                      (_ o _)
 (_,_)                                                                        (_,_) 
   _      _      _      _      _      _      _      _      _      _      _      _   
 _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_  _( )_ 
(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)(_ o _)
 (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_)  (_,_) 
 
=== This is a simple script that uses Google Form and Google Sheet to create a functional "like button". Feel free to use it as you want & style it as you like. ===

=== Cobbled together by Fritzi (https://bohemiansultriness.nekoweb.org) Please don't remove the credits! ===

=== For more code snippets, visit https://bohemiansultriness.nekoweb.org/siteinfo.html#tutorials ===

=== If you want to use several like buttons within one page, use mylikebuttonsection.txt (https://bohemiansultriness.nekoweb.org/goodies/mylikebuttonsection.txt) instead. ===
 
### Compatibility Note ###

This script will only work on sites with a non-strict content policy, such as Nekoweb. Sites that enforce strict Content Security Policies (CSP) may block this type of form submission due to restrictions on where forms can send data. 

### Instructions for Obtaining Google Form Field IDs, Google Form ID and Google Sheet ID ###

1. **Create a Google Form**:
   - Go to Google Forms and create your form with the required two "short answer" fields.
   - For example: "emoji" and "page".

2. **Get Field IDs**:
   - Click on the three dots (More) in the top right corner.
   - Select "Get pre-filled link."
   - Fill out the form fields with sample data and click "Submit."
   - Copy the URL from the resulting page.

3. **Dissect the URL**:
   - The URL will look something like this:
     `https://docs.google.com/forms/d/e/placeholder-formBC1234567890/viewform?usp=pp_url&entry.123456789=Sample+Text`
   - The part after `entry.` (e.g., `entry.123456789`) is your field ID. You will need to replace `entry.placeholder1`, `entry.placeholder2`in your HTML with these IDs.

4. **Get Google Form ID**:
   - The Google Form ID is found in the URL of your form when you are editing it.
   - It appears between `/d/e/` and `/viewform` in the URL.
   - For example, in `https://docs.google.com/forms/d/e/placeholder-formABC1234567890/viewform`, `placeholder-formABC1234567890` is your Google Form ID.
   - Replace `placeholder-formABC1234567890` in your JavaScript with this ID.
   
5. **Change Access**:
   - In your Google Form press "share" and change general access to "anyone with link".

6. **Create a Google Sheet**:
   - In the Google Form navigate to the "response" tab and click on "create spreadsheet".
   - In the Google Sheet press "share" and change general access to "anyone with link".
   
7. **Get Google Sheet ID**:
   - The Google Sheet ID is found in the URL of your form when you are editing it.
   - It appears between `/d/` and `/edit` in the URL.
   - For example, in `https://docs.google.com/spreadsheets/d/placeholder-sheetABC1234567890/edit?usp=sharing`, `placeholder-sheetABC1234567890` is your Google Sheet ID.
   - Replace `placeholder-sheetABC1234567890` in your JavaScript with this ID.
   
8. **Styling**:
   - Style the .mylikebutton classes below however you like.
   - Fin 'popup.textContent = "Thank you very much, you've liked this page!";' and replace it with whatever message you like.
   
9. **Implementing the Like Button**:
   - In your HTML file add  <div class="mylikebutton">♡</div> to display the 'like button' 
   - You can choose whatever icon or image you like;  ♡ is just an example.
   - link this script at the end of your document within the <body> tag like so: <script src="PATHtoYOURfile/mylikebutton.js"></script>

*/

document.addEventListener('DOMContentLoaded', function () {
    const likeButtonElements = document.querySelectorAll('.mylikebutton');

    if (likeButtonElements.length === 0) return;

    // Get the current page path (use 'home' for root or index pages)
    const currentPath = window.location.pathname;
    const pagePath = currentPath === '/' || currentPath.endsWith('index.html') 
        ? 'home' 
        : currentPath.replace(/^\/|\/$/g, ''); // Remove leading/trailing slashes

    // Add styles for the like button container, counter, and popup
    const style = document.createElement('style');
    style.textContent = `
        .mylikebutton-container {
            display: block;
            text-align: left;
            margin-bottom: 10px;
            cursor: pointer;
            transition: transform 0.1s ease, color 0.3s ease;
        }
        .mylikebutton {
            display: inline-block;
            vertical-align: middle;
            transition: transform 0.1s ease, color 0.3s ease;
            font-size:1.5em;
        }
        .mylikebutton-counter {
            display: inline-block;
            vertical-align: middle;
            margin-left: 2px;
            font-size: 1em;
            color: #fff;
        }

        .mylikebutton:hover {
        transform: scale(1.3);
        }

        .mylikebutton:active {
        transform: scale(1);
        }

        .mylikebutton-popup {
            display: none;
            position: fixed;
            z-index: 9999;
            max-width: 300px;
            padding: 8px;
            background: #fff;
            border: 1px solid #000;
            font: 12px "Courier", monospace;
            color: #000;
            pointer-events: none;
        }

        @keyframes pop {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
        }

        .mylikebutton.pop {
        animation: pop 0.3s ease forwards;
        }

    `;
    document.head.appendChild(style);

    // Create a popup element for feedback messages
    const popup = document.createElement('div');
    popup.className = 'mylikebutton-popup';
    document.body.appendChild(popup);

    // Google Form and Sheet details
        const GOOGLE_FORM_ID = "1FAIpQLSc0gNNQZaMbrD6V41a0DZHKR_bsnD66FXK7IEj8vcSjgLEGwg";
        const EMOJI_ENTRY_ID = "entry.1656792327";
        const PAGE_ENTRY_ID = "entry.543458836";
        const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAPB1paQUdJ-scNRZ23ONpjnxxRR1mZYqZJQiKl2glKNiUXn09N6cp98ztIeeJ3HehxoKHkiZzHSXP/pub?output=csv";
        const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    // Fetch like counts for the current page from Google Sheet
    async function fetchLikeCounts() {
        try {
            const response = await fetch(GOOGLE_SHEET_URL);
            const data = await response.text();
            
            // Split CSV data into rows
            const rows = data.split('\n').slice(1); // Skip header row
            
            // Count rows that match the current page path
            const pageCount = rows.filter(row => row.includes(pagePath)).length;

            return pageCount; // Return the count of likes for this page
        } catch (error) {
            console.error("Error fetching like counts:", error);
            return 0; // Default to zero likes on error
        }
    }

    likeButtonElements.forEach(async function (likeButtonElement) {
        let pageLikes = await fetchLikeCounts(); // Fetch initial like count for this page

        // Create a container for the button and counter
        const container = document.createElement('div');
        container.className = 'mylikebutton-container';
        container.setAttribute('role', 'button');
        container.setAttribute('aria-label', 'Click to like!');

        likeButtonElement.parentNode.insertBefore(container, likeButtonElement);
        container.appendChild(likeButtonElement);

        // Create and append a counter display element
        const counterDisplay = document.createElement('span');
        counterDisplay.className = 'mylikebutton-counter';
        counterDisplay.textContent = `(${pageLikes})`;
        container.appendChild(counterDisplay);

        if (localStorage.getItem(`liked-${pagePath}`)) {
        likeButtonElement.classList.add('clicked');
        likeButtonElement.textContent = '🖤';
        }
        // Handle click events on the button container
        container.addEventListener('click', async function (event) {
            // Prevent multiple likes per post using localStorage
            if (localStorage.getItem(`liked-${pagePath}`)) {
                popup.textContent = "You already liked this post!";
                popup.style.display = 'block';
                popup.style.left = event.clientX + 'px';
                popup.style.top = event.clientY + 'px';
                setTimeout(() => popup.style.display = 'none', 2000);
                return;
            }
            localStorage.setItem(`liked-${pagePath}`, 'true')

            likeButtonElement.classList.add('clicked');
            likeButtonElement.textContent = '🖤'; // change white heart to black
            // Trigger pop animation
            likeButtonElement.classList.remove('pop');
            void likeButtonElement.offsetWidth;
            likeButtonElement.classList.add('pop');
            pageLikes++; // Increment local like count immediately for feedback
            counterDisplay.textContent = `(${pageLikes})`;

            try {
                // Prepare form data with emoji and page path
                const formData = new FormData();
                formData.append(EMOJI_ENTRY_ID, likeButtonElement.textContent);
                formData.append(PAGE_ENTRY_ID, pagePath);

                await fetch(GOOGLE_FORM_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData,
                });

                // Show a feedback popup near the click location
                popup.textContent = "Liked!";
                popup.style.display = 'block';

                const popupRect = popup.getBoundingClientRect();
                let left = event.clientX + 10;
                let top = event.clientY + 10;

                if (left + popupRect.width > window.innerWidth) {
                    left = window.innerWidth - popupRect.width - 10;
                }

                if (top + popupRect.height > window.innerHeight) {
                    top = window.innerHeight - popupRect.height - 10;
                }

                popup.style.left = `${left}px`;
                popup.style.top = `${top}px`;

                setTimeout(function () {
                    popup.style.display = 'none';
                }, 3000);

                // Wait a bit to give Google Sheets time to update
                await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds

                // Then refetch updated like count
                pageLikes = await fetchLikeCounts();
                counterDisplay.textContent = `(${pageLikes})`;

                
            } catch (error) {
                console.error("Error submitting like to Google Form:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    });
});