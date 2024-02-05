import MetaHead from "components/MetaHead";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("ready");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmissionStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNumber, message }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      // Update submission status to success
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
      console.error("There was an error sending the message:", error);
    }
  }

  return (
    <>
      <MetaHead
        title='Haar Atelier Alkmaar | Contact'
        description='Gespecialiseerd in kleur, balayage, highlights, natuurlijke looks.'
      />
      <div className='px-4 py-8 md:px-8 lg:px-12 xl:px-24 max-w-screen-2xl mx-auto'>
        <h1 className='text-4xl md:text-5xl pb-4 mx-auto md:w-max'>Parkeren & Contact</h1>

        <ul className='list-disc list-inside space-y-4 py-4 mx-auto md:w-max'>
          {/* <h2>Parkeergarage´s op loopafstand: </h2> */}

          <li className='flex flex-col items-center'>
            <div className='flex items-center gap-1'>
              <FaMapMarkerAlt className='text-blue-500 text-lg' />
              <a
                className='text-blue-500 underline text-lg'
                href='https://www.google.com/maps/place/Karperton/@52.6322533,4.7493758,17z/data=!3m1!4b1!4m6!3m5!1s0x47cf57b4fac4eb83:0xdbb5ecba9292bc26!8m2!3d52.6322501!4d4.7519507!16s%2Fg%2F1tjymzm2?entry=ttu'
              >
                Karperton
              </a>
            </div>
            <p>3 minuten lopen, €1,82 per uur </p>
            <p>(deze garage is vrij krap)</p>
          </li>

          <li className='flex flex-col items-center'>
            <div className='flex items-center gap-1'>
              <FaMapMarkerAlt className='text-blue-500 text-lg' />
              <a
                className='text-blue-500 underline text-lg'
                href='https://www.google.com/maps/place/Schelphoek/@52.6272274,4.7488896,17z/data=!3m1!4b1!4m6!3m5!1s0x47cf56353376c34b:0x5bd3eed29fd373ce!8m2!3d52.6272242!4d4.7537605!16s%2Fg%2F11bydnhr35?entry=ttu'
              >
                Schelphoek
              </a>
            </div>
            <p>12 minuten lopen, €1,82 per uur</p>
          </li>

          <li className='flex flex-col items-center'>
            <div className='flex items-center gap-1'>
              <FaMapMarkerAlt className='text-blue-500 text-lg' />
              <a
                className='text-blue-500 underline text-lg'
                href='https://www.google.com/maps/place/De+Kwakel+%E2%82%AC3,00+per+dag+24uur+uitrijden/@52.6353583,4.749696,17z/data=!3m1!4b1!4m6!3m5!1s0x47cf57b374b69291:0xa2ef1e452d3db140!8m2!3d52.6353551!4d4.7522709!16s%2Fg%2F1tf_s3t4?entry=ttu'
              >
                Kwakel
              </a>
            </div>
            <p>15 minuten lopen, €0,80ct per uur</p>
            <p>(max dagtarief €3)</p>
          </li>

          <div className='pt-4'>
            <iframe
              title='Google Maps'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1176.3115153638068!2d4.749950976865704!3d52.63179260474207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf5738aac006b3%3A0x21bfafd575825be4!2sHaar%20Atelier%20Alkmaar!5e0!3m2!1snl!2snl!4v1697082060212!5m2!1snl!2snl'
              width='100%'
              height='300'
              loading='lazy'
              aria-hidden='true'
              className='md:hidden mt-4 md:mt-0 rounded-lg shadow-md'
            ></iframe>
          </div>
        </ul>

        <div className='flex flex-col md:flex-row py-8 md:gap-24 lg:gap-48 mx-auto justify-center'>
          <div className='flex flex-col'>
            <h2 className='pb-2 text-4xl'>Gegevens</h2>
            <p>Haar Atelier Alkmaar</p>
            <p>Voordam 10A</p>
            <p>1811 MA Alkmaar</p>
            <div className='flex pt-4 gap-1'>
              <p>T:</p>
              <a className='underline' href='tel: +31651126003'>
                06 51126003
              </a>
            </div>
            <div className='flex gap-1'>
              <p>E:</p>
              <a className='underline' href='mailto:info@marloesotjes-haaratelier.nl'>
                info@marloesotjes-haaratelier.nl
              </a>
            </div>
          </div>

          <div className='pt-4 md:p-0'>
            <h2 className='text-4xl'>Openingstijden</h2>
            <p className='py-1'>Geopend op afspraak</p>
            <div className='flex'>
              <div className='pr-24'>
                <p>Maandag</p>
                <p>Dinsdag</p>
                <p>Woensdag</p>
                <p>Donderdag</p>
                <p>Vrijdag</p>
                <p>Zaterdag</p>
                <p>Zondag</p>
              </div>
              <div className=''>
                <p>9:30 - 17:00</p>
                <p>8:00 - 18:00</p>
                <p>9:30 - 17:00</p>
                <p>9:00 - 20:00</p>
                <p>8:00 - 18:00</p>
                <p>8:00 - 16:30</p>
                <p>Gesloten</p>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center text-sm md:text-base'>
          <em>
            U kunt uw afspraak uitsluitend per telefoon of e-mail kosteloos wijzigen of annuleren binnen 48 uur voor
            aanvang van de afspraak, daarna zijn wij genoodzaakt 50% van de behandelprijs in rekening te brengen. Bij
            niet annuleren, dus “no show” moeten wij helaas het gehele bedrag in rekening brengen.
          </em>
        </div>

        <div className='py-8 flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/2'>
            <h2 className='pb-4 text-4xl'>Contactformulier</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <label htmlFor='name' className='flex flex-col'>
                <span className='mb-1'>Naam:</span>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='rounded-lg border-gray-300 border p-2 shadow-sm'
                />
              </label>
              <label htmlFor='email' className='flex flex-col'>
                <span className='mb-1'>Email:</span>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='rounded-lg border-gray-300 border p-2 shadow-sm'
                />
              </label>
              <label htmlFor='phonenumber' className='flex flex-col'>
                <span className='mb-1'>Telefoonnummer:</span>
                <input
                  type='tel'
                  id='phonenumber'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className='rounded-lg border-gray-300 border p-2 shadow-sm'
                />
              </label>
              <label htmlFor='message' className='flex flex-col'>
                <span className='mb-1'>Bericht:</span>
                <textarea
                  id='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className='rounded-lg border-gray-300 border p-2 shadow-sm'
                />
              </label>
              {submissionStatus === "ready" ? (
                <button type='submit' className='bg-accent-500 p-2 my-3 rounded-lg text-white w-full md:w-max'>
                  Versturen
                </button>
              ) : submissionStatus === "loading" ? (
                <button
                  type='submit'
                  className='bg-accent-500 p-2 my-3 rounded-lg text-white w-full md:w-max opacity-50 cursor-not-allowed'
                  disabled
                >
                  Versturen
                </button>
              ) : (
                <div
                  className={
                    submissionStatus === "success"
                      ? "p-2 my-3 rounded-lg bg-green-300 w-full md:w-max"
                      : "p-2 my-3 rounded-lg bg-red-300 w-full md:w-max"
                  }
                >
                  {submissionStatus === "success" ? "Bericht verzonden!" : "Er is iets fout gegaan."}
                </div>
              )}
            </form>
          </div>

          <div className='md:w-1/2'>
            <iframe
              title='Google Maps'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1176.3115153638068!2d4.749950976865704!3d52.63179260474207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf5738aac006b3%3A0x21bfafd575825be4!2sHaar%20Atelier%20Alkmaar!5e0!3m2!1snl!2snl!4v1697082060212!5m2!1snl!2snl'
              width='100%'
              height='100%'
              loading='lazy'
              aria-hidden='true'
              className='hidden md:block mt-4 md:mt-0 rounded-lg shadow-md'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
