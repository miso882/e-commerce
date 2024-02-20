<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\CountryRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Controller\CheckloginController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class UserController extends AbstractController
{
    private $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[Route('/api/users', name: 'users', methods: ['GET'])]
    // #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour supprimer un utilisateur')]
    public function getUserList(SerializerInterface $serializer, UserRepository $userRepository): JsonResponse
    {
        $userList = $userRepository->findAll();
        $jsonUserList = $serializer->serialize($userList, 'json', ['groups' => 'getUser']);
        return new JsonResponse($jsonUserList, Response::HTTP_OK, [], true);
    }
    
    #[Route('/api/users/{email}', name: 'get_user_email', methods: ['GET'])]
    public function getUseremail(SerializerInterface $serializer, User $user): JsonResponse
    {
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUser']);
        return new JsonResponse($jsonUser, Response::HTTP_OK, ['accept' => 'json'], true);
    }

    #[Route('/api/users/{email}', name: 'detailUser', methods: ['GET'])]
    public function getDetailUser(SerializerInterface $serializer, User $user): JsonResponse
    {
        // $user = $userRepository->find($id);
        // if($user){
            $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUser']);
            return new JsonResponse($jsonUser, Response::HTTP_OK, ['accept' => 'json'], true);
        // return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
        // }
        // return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    #[Route('/api/users/{id}', name: 'deleteUser', methods: ['DELETE'])]
    public function deleteUser(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/users', name: "createUser", methods: ['POST'])]
    public function createUser(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordHasherInterface $passwordHasher,
        CountryRepository $countryRepository
    ): JsonResponse {
        $content = $request->toArray();
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $user->getPassword()
        );
        $idcountry = $content['country'] ?? -1;
        $user->setCountry($countryRepository->find($idcountry));
        $user->setPassword($hashedPassword);
        $em->persist($user);
        $em->flush();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUser']);
        $location = $urlGenerator->generate('detailUser', ['email' => $user->getEmail()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }
    #[Route('/api/googleusers', name: "googleCreateUser", methods: ['POST'])]
    public function googleUser(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        // $hashedPassword = $passwordHasher->hashPassword(
        //     $user,
        //     $user->getPassword()
        // );
        // $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUser']);
        $location = $urlGenerator->generate('detailUser', ['email' => $user->getEmail()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    #[Route('/api/facebookusers', name: "facebookCreateUser", methods: ['POST'])]
    public function facebookUser(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        // $hashedPassword = $passwordHasher->hashPassword(
        //     $user,
        //     $user->getPassword()
        // );
        // $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUser']);
        $location = $urlGenerator->generate('detailUser', ['email' => $user->email()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    #[Route('/api/microsoftusers', name: "microsoftCreateUser", methods: ['POST'])]
    public function microsoftUser(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        // $hashedPassword = $passwordHasher->hashPassword(
        //     $user,
        //     $user->getPassword()
        // );
        // $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUser']);
        $location = $urlGenerator->generate('detailUser', ['email' => $user->email()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    #[Route('/api/login/facebook', name: "facebookLogin", methods: ['POST'])]
    public function facebookGoogle(Request $request, UserRepository $userRepository)
    {
        $req = $request->toArray();
        $user = $userRepository->findBy(["email" => $req["email"]], null, 1);
        if (isset($req["idfacebook"]) && $req["idfacebook"] == $user[0]->getIdfacebook()) {
            $token = $this->jwtManager->create($user[0]);
            return new JsonResponse($token, Response::HTTP_OK, ['accept' => 'json'], true);
        }
    }
    #[Route('/api/login/google', name: "googleLogin", methods: ['POST'])]
    public function authGoogle(Request $request, UserRepository $userRepository)
    {
        $req = $request->toArray();
        $user = $userRepository->findBy(["email" => $req["email"]], null, 1);
        if (isset($req["idgoogle"]) && $req["idgoogle"] == $user[0]->getIdgoogle()) {
            $token = $this->jwtManager->create($user[0]);
            return new JsonResponse($token, Response::HTTP_OK, ['accept' => 'json'], true);
        }
    }
    #[Route('/api/login/microsoft', name: "microsoftLogin", methods: ['POST'])]
    public function authMicrosoft(Request $request, UserRepository $userRepository)
    {
        $req = $request->toArray();
        $user = $userRepository->findBy(["email" => $req["email"]], null, 1);
        if (isset($req["idmicrosoft"]) && $req["idmicrosoft"] == $user[0]->getIdmicrosoft()) {
            $token = $this->jwtManager->create($user[0]);
            return new JsonResponse($token, Response::HTTP_OK, ['accept' => 'json'], true);
        }
    }

    #[Route('/api/users/{email}', name: "updatdeUser", methods: ['PUT'])]
    public function updatedUsers(
        Request $request,
        SerializerInterface $serializer,
        User $currentUser,
        EntityManagerInterface $em,
        CountryRepository $countryRepository
    ): JsonResponse {
        $updatedUser = $serializer->deserialize(
            $request->getContent(),
            User::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentUser]
        );
        $content = $request->toArray();
        $idcountry = $content['country'] ?? -1;
        $updatedUser->setCountry($countryRepository->find($idcountry));
                
        $em->persist($updatedUser);
        $em->flush();
        $jsonUser = $serializer->serialize($updatedUser, 'json', ['groups' => 'getUser']);
                // $location = $urlGenerator->generate('detailUser', ['email' => $user->getEmail()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, JsonResponse::HTTP_NO_CONTENT);
    }
}
